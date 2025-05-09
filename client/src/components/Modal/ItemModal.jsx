import React, { useState, useEffect, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { addOns } from "../../constants";
import AddItem from "./AddItem";
import { useDispatch } from "react-redux";
import { updateCartItem } from "../../redux/slices/cart/cartSlice";
import { Alert } from "flowbite-react";

const ItemModal = ({ isOpen, category, item, onClose }) => {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const [status, setStatus] = useState("idle");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [notes, setNotes] = useState("");
  const [isTwoPounds, setIsTwoPounds] = useState(false);
  const [price, setPrice] = useState(() => item?.price || item?.tags?.[0]?.price || 0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position when the modal opens
      setScrollPosition(window.scrollY);

      // Lock the page scroll by setting the body position to fixed
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPosition}px`; // Offset by the scroll position to avoid jumping

    } else {
      // Restore the scroll position when the modal closes
      document.body.style.position = "";
      document.body.style.top = ""; // Reset the top offset

      // Restore the scroll position
      window.scrollTo(0, scrollPosition);
    }

  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Poll store status
  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const response = await fetch("/api/store/openClose");
        const data = await response.json();
        setStatus(data);
      } catch (err) {
        console.error("Error fetching store status:", err);
      }
    };

    fetchStoreStatus();
    const intervalId = setInterval(fetchStoreStatus, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isTwoPounds && category === "wing") {
      const wingSauceNames = addOns?.wing?.wingSauce?.map((s) => s.name) || [];
      const selectedSauces = selectedAddOns.filter((a) => wingSauceNames.includes(a.name));

      if (selectedSauces.length > 1) {
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
        setSelectedAddOns(exists ? selectedAddOns.filter((a) => a.name !== addOn.name) : [...selectedAddOns, addOn]);
        return;
      }

      if (isWingSauce) {
        const currentSauces = selectedAddOns.filter((a) => wingSauceNames.includes(a.name));
        if (!isTwoPounds) {
          setSelectedAddOns(exists ? selectedAddOns.filter((a) => a.name !== addOn.name) : [
            ...selectedAddOns.filter((a) => !wingSauceNames.includes(a.name)),
            addOn,
          ]);
        } else {
          if (exists) {
            setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
          } else if (currentSauces.length < 2) {
            setSelectedAddOns([...selectedAddOns, addOn]);
          }
        }
        return;
      }

      if (isVeggieDip) {
        const others = selectedAddOns.filter((a) => !veggieDipNames.includes(a.name));
        setSelectedAddOns(exists ? others : [...others, addOn]);
        return;
      }

      setSelectedAddOns(exists ? selectedAddOns.filter((a) => a.name !== addOn.name) : [...selectedAddOns, addOn]);
      return;
    }

    const isFreeSelection = ["pizza", "fries", "salad", "knots", "sticks", "poutine"].includes(category);
    if (isFreeSelection) {
      setSelectedAddOns(exists ? selectedAddOns.filter((a) => a.name !== addOn.name) : [...selectedAddOns, addOn]);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 5) setQuantity(value);
  };

  const handleNotesChange = (e) => setNotes(e.target.value);

  const handleAddToCart = () => {
    if (!status.isOpen) {
      setStatus("error");
      return;
    }

    const updatedItem = {
      ...item,
      name: isTwoPounds ? "2 Pound Wings" : item.name,
      price,
      category,
    };

    dispatch(updateCartItem(updatedItem));
    setAlertProps({ item: updatedItem, addOns: selectedAddOns, quantity, notes });
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
              const isSelected = selectedAddOns.some((a) => a.name === addOn.name);
              return (
                <label key={addOn.name + index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 text-red-600 accent-red-600"
                      checked={isSelected}
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
      const inputType = group === "extraSauce" || (isWingSauce && isTwoPounds) ? "checkbox" : "radio";

      return (
        <div key={group} className="mt-4">
          <h4 className="font-semibold text-red-700 capitalize">{group.replace(/([A-Z])/g, " $1")}</h4>
          <div className={`space-y-1 mt-2 text-gray-800 ${isWingSauce ? "grid grid-cols-2 gap-4" : ""}`}>
            {items.map((addOn, index) => {
              const isSelected = selectedAddOns.some((a) => a.name === addOn.name);
              return (
                <label key={addOn.name + index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <input
                      type={inputType}
                      className="mr-2 text-red-600 accent-red-600"
                      name={inputType === "radio" ? group : undefined}
                      checked={isSelected}
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
<div className="fixed inset-0 flex justify-center items-center top-7 bg-black bg-opacity-50 mt-10 z-50">
  <div
    ref={modalRef}
    className="bg-white sm:p-6 p-2 px-4 rounded-lg w-11/12 sm:max-w-xl  relative max-h-[85vh] overflow-y-auto z-50"
  >

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
          <div className="sm:mt-4 mt-3">
            <img src={item.image} alt={item.name} className="w-full sm:h-48 h-40 object-cover rounded-md" />
          </div>
        )}

        {price && <p className="text-xl font-semibold text-red-700 mt-4">Price: ${price}</p>}

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
          <label htmlFor="quantity" className="text-sm text-gray-700">Quantity:</label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="bg-white text-red-500 border-red-600 border-2 font-semibold rounded-md py-1 px-3 text-xs mt-2 w-20"
          >
            {[1, 2, 3, 4, 5].map((qty) => (
              <option key={qty} value={qty}>{qty}</option>
            ))}
          </select>
        </div>

        <div className="mt-1">
          <label htmlFor="notes" className="block text-sm text-gray-700">Optional Notes:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add any notes here..."
            className="w-full mt-2 p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 text-[12px] sm:text-sm h-14"
            rows="4"
          />
        </div>

        {status.isOpen === false && <Alert color="failure">Store is currently closed.</Alert>}

        <div className="sm:mt-6 mt-1 flex justify-center">
          <button
            onClick={handleAddToCart}
            disabled={!status.isOpen}
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
