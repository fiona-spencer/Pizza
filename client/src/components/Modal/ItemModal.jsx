import React, { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { addOns } from "../../constants";
import AddItem from "./AddItem";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../redux/slices/cart/cartSlice";
import { Alert } from 'flowbite-react';  // Import Flowbite Alert

const ItemModal = ({ isOpen, category, item, onClose }) => {
  const dispatch = useDispatch();
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [notes, setNotes] = useState("");
  const [isTwoPounds, setIsTwoPounds] = useState(false);
  const [price, setPrice] = useState(() => item?.price || item?.tags?.[0]?.price || 0);
  const [storeStatus, setStoreStatus] = useState({ isOpen: true });

  useEffect(() => {
    // Fetch store status
    const fetchStoreStatus = async () => {
      try {
        const response = await fetch('/openClose');
        const data = await response.json();
        setStoreStatus(data); // Update the store status
      } catch (error) {
        console.error('Error fetching store status:', error);
      }
    };
    
    fetchStoreStatus(); // Call the API on mount
  }, []);

  useEffect(() => {
    if (!isTwoPounds && category === "wing") {
      const wingSauceNames = addOns?.wing?.wingSauce?.map((s) => s.name) || [];
      const updatedAddOns = [...selectedAddOns];
      const selectedSauces = selectedAddOns.filter((a) => wingSauceNames.includes(a.name));
  
      if (selectedSauces.length > 1) {
        // Keep only the first selected sauce
        const preserved = selectedSauces[0];
        const others = selectedAddOns.filter((a) => !wingSauceNames.includes(a.name));
        setSelectedAddOns(preserved ? [...others, preserved] : others);
      }
    }
  }, [isTwoPounds, category, selectedAddOns]);
  

  if (!isOpen) return null;

  const handleAddOnChange = (addOn) => {
    const exists = selectedAddOns.find((a) => a.name === addOn.name);
    const wingSauceNames = addOns?.wing?.wingSauce?.map((s) => s.name) || [];
    const veggieDipNames = addOns?.wing?.veggieDip?.map((s) => s.name) || [];
    const isWingSauce = wingSauceNames.includes(addOn.name);
    const isVeggieDip = veggieDipNames.includes(addOn.name);
    const isExtraSauce = addOn.name === "Extra Saucey";
  
    if (category === "wing") {
      if (isExtraSauce) {
        if (exists) {
          setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
        } else {
          setSelectedAddOns([...selectedAddOns, addOn]);
        }
        return;
      }
  
      if (isWingSauce) {
        const currentSauces = selectedAddOns.filter((a) => wingSauceNames.includes(a.name));
  
        if (!isTwoPounds) {
          // 1-pound: only one sauce
          if (exists) {
            setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
          } else {
            const others = selectedAddOns.filter((a) => !wingSauceNames.includes(a.name));
            setSelectedAddOns([...others, addOn]);
          }
        } else {
          // 2-pound: up to 2 sauces
          if (exists) {
            setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
          } else if (currentSauces.length < 2) {
            setSelectedAddOns([...selectedAddOns, addOn]);
          }
        }
        return;
      }
  
      if (isVeggieDip) {
        // only allow one veggie dip
        const others = selectedAddOns.filter((a) => !veggieDipNames.includes(a.name));
        setSelectedAddOns(exists ? others : [...others, addOn]);
        return;
      }
  
      // all other add-ons
      if (exists) {
        setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
      } else {
        setSelectedAddOns([...selectedAddOns, addOn]);
      }
      return;
    }
  
    // Free selection categories
    const isFreeSelectionCategory = ["pizza", "fries", "salad", "knots", "sticks", "poutine"].includes(category);
    if (isFreeSelectionCategory) {
      if (exists) {
        setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
      } else {
        setSelectedAddOns([...selectedAddOns, addOn]);
      }
    }
  };
  
  

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleAddToCart = () => {
    // Dispatch an action to update the cart with the new name if 2 pounds selected
    const updatedItem = {
      ...item,
      name: isTwoPounds ? "2 Pound Wings" : item.name, // Change name if 2 pounds selected
      price,
      category,
    };
    
    dispatch(updateCartItem(updatedItem)); // Dispatch updateCartItem action with updated name and price

    setAlertProps({
      item: updatedItem,
      addOns: selectedAddOns,
      quantity,
      notes,
    });
    setShowAlert(true);
  };

  const renderAddOnOptions = () => {
    const categoryAddOns = addOns[category];
    if (!categoryAddOns) return null;

    if (Array.isArray(categoryAddOns)) {
      return (
        <div className="mt-4">
          <h4 className="font-semibold text-red-700 capitalize">Add-Ons</h4>
          <div className="space-y-1 mt-2 text-gray-800">
            {categoryAddOns.map((addOn, index) => {
              const isSelected = selectedAddOns.find((a) => a.name === addOn.name);
              return (
                <label key={`${addOn.name}-${index}`} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-red-600 accent-red-600"
                      checked={!!isSelected}
                      onChange={() => handleAddOnChange(addOn)}
                    />
                    <span>{addOn.name}</span>
                  </div>
                  <span className={`text-sm ${addOn.price === 0 ? "text-red-700" : "text-gray-600"}`}>
                    {addOn.price === 0 ? "" : `$${addOn.price}`}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    return Object.entries(categoryAddOns).map(([group, items]) => {
      const isWingSauce = group === "wingSauce";
      const gridClasses = isWingSauce ? "grid grid-cols-2 gap-4" : "";

      return (
        <div key={group} className="mt-4">
          <h4 className="font-semibold text-red-700 capitalize">
            {group.replace(/([A-Z])/g, " $1")}
          </h4>
          <div className={`space-y-1 mt-2 text-gray-800 ${gridClasses}`}>
            {items.map((addOn, index) => {
              const isSelected = selectedAddOns.find((a) => a.name === addOn.name);
              const inputType =
                group === "extraSauce"
                  ? "checkbox"
                  : isWingSauce && isTwoPounds
                  ? "checkbox"
                  : "radio";

              return (
                <label key={`${addOn.name}-${index}`} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <input
                      type={inputType}
                      className="mr-2 text-red-600 accent-red-600"
                      name={
                        group === "extraSauce"
                          ? "extraSauceChoice"
                          : isWingSauce && isTwoPounds
                          ? "wingSauceChoice"
                          : undefined
                      }
                      checked={!!isSelected}
                      onChange={() => handleAddOnChange(addOn)}
                    />
                    <span>{addOn.name}</span>
                  </div>
                  <span className={`text-sm ${addOn.price === 0 ? "text-red-700" : "text-gray-600"}`}>
                    {addOn.price === 0 ? "" : `$${addOn.price}`}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 mt-10" style={{ zIndex: 9999 }}>
      <div className="bg-white sm:p-6 p-2 px-4 rounded-lg w-11/12 sm:max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-600">
            {isTwoPounds ? "2 Pound Wings" : item.name}
          </h2>
          <IoMdCloseCircle
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 cursor-pointer w-6 h-6"
          />
        </div>

        {category !== "wing" && (
          <>
            <div className="sm:mt-4 mt-3">
              <img src={item.image} alt={item.name} className="w-full sm:h-48 h-40 object-cover rounded-md" />
            </div>
            <p className="text-gray-700 mt-4 mb-2 text-[12px]">{item.description}</p>
          </>
        )}

        {price && (
          <p className="text-xl font-semibold text-red-700 mt-4">
            Price: ${price}
          </p>
        )}

        {category === "wing" && (
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={isTwoPounds}
              onChange={() => setIsTwoPounds((prev) => !prev)}
              className="mr-2 text-red-600 accent-red-600"
            />
            <span className="text-sm text-black">Upgrade to 2 Pounds ($27)</span>
          </div>
        )}

        {renderAddOnOptions()}

        <div className="sm:mt-4 flex items-center justify-left gap-3 mt-2">
          <label htmlFor="quantity" className="text-sm text-gray-700">
            Quantity:
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="bg-white text-red-500 border-red-600 border-2 font-semibold rounded-md py-1 px-3 text-xs mt-2 w-20"
          >
            {[1, 2, 3, 4, 5].map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-1">
          <label htmlFor="notes" className="block text-sm text-gray-700">
            Optional Notes:
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add any notes here..."
            className="w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 text-[12px] sm:text-sm h-14"
            rows="4"
          ></textarea>
        </div>

        {storeStatus.isOpen === false && (
          <Alert color="failure">
            Store is currently closed.
          </Alert>
        )}

        <div className="sm:mt-6 mt-1 flex justify-center">
          <button
            onClick={handleAddToCart}
            disabled={!storeStatus.isOpen} // Disable button if store is closed
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Add to Cart
          </button>
        </div>

        {showAlert && alertProps && (
          <AddItem
            {...alertProps}
            onSuccess={() => {
              setTimeout(() => {
                setShowAlert(false);
                onClose();
              }, 1500);
            }}
            onError={() => {
              setTimeout(() => setShowAlert(false), 2000);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ItemModal;
