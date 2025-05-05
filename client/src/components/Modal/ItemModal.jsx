import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { addOns } from "../../constants";
import AddItem from "./AddItem";

const ItemModal = ({ isOpen, category, item, onClose }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);
  const [notes, setNotes] = useState(""); // Added state for notes

  if (!isOpen) return null;

  // Extract the price based on the category
  let price = null;
  if (category === 'knots' || category === 'fries' || category === 'salad') {
    price = item?.tags?.[0]?.price;  // Correctly reference price inside tags array
  } else if (category === 'pizza' && item?.tags) {
    // For pizza, extract price from tags (assuming one tag with price exists)
    const priceTag = item?.tags?.find(tag => tag.price);
    if (priceTag) {
      price = priceTag.price.replace("CA ", "");  // Remove the "CA " prefix
    }
  }

  // If price is still null or NaN, set a default value (optional)
  if (!price || isNaN(price)) {
    price = "0.00";
  }

  const handleAddOnChange = (addOn) => {
    const exists = selectedAddOns.find((a) => a.name === addOn.name);
    if (exists) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.name !== addOn.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= 5) {
      setQuantity(value);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value); // Update notes state
  };

  const handleAddToCart = () => {
    // Pass price along with other details
    setAlertProps({ item, addOns: selectedAddOns, quantity, notes, price });
    setShowAlert(true);
  };

  const renderAddOnOptions = () => {
    if (!addOns[category]) return null;
    return Object.entries(addOns[category]).map(([group, items]) => (
      <div key={group} className="mt-4">
        <h4 className="font-semibold text-red-700 capitalize">
          {group.replace(/([A-Z])/g, " $1")}
        </h4>
        <div className="space-y-1 mt-2 text-gray-800">
          {items.map((addOn) => (
            <label
              key={addOn.name}
              className="flex justify-between items-center text-sm"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-red-600 accent-red-600"
                  checked={!!selectedAddOns.find((a) => a.name === addOn.name)}
                  onChange={() => handleAddOnChange(addOn)}
                />
                <span>{addOn.name}</span>
              </div>
              <span
                className={`text-sm ${
                  addOn.price === 0 ? "text-white" : "text-gray-600"
                }`}
              >
                {addOn.price === 0 ? "" : `$${addOn.price.toFixed(2)}`}
              </span>
            </label>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 mt-10"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white sm:p-6 p-2 px-4 rounded-lg w-11/12 sm:max-w-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-600">{item.name}</h2>
          <IoMdCloseCircle
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 cursor-pointer w-6 h-6"
          />
        </div>

        <div className="sm:mt-4 mt-3">
          <img
            src={item.image}
            alt={item.name}
            className="w-full sm:h-48 h-40 object-cover rounded-md"
          />
        </div>

        <p className="text-gray-700 mt-4 mb-2 text-[12px]">{item.description}</p>

        {/* Displaying the price for the item */}
        {price && (
          <p className="text-xl font-semibold text-red-700 mt-4">
            Price: ${price}
          </p>
        )}

        {renderAddOnOptions()}

        <div className="sm:mt-4 flex items-center justify-left gap-3">
          <label htmlFor="quantity" className="text-sm text-gray-700">
            Quantity:
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="bg-white text-red-500 border-red-600 border-2 font-semibold rounded-md py-1 px-3 text-sm"
          >
            {[1, 2, 3, 4, 5].map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Notes Section */}
        <div className="mt-4">
          <label htmlFor="notes" className="block text-sm  text-gray-700">
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

        <div className="sm:mt-6 mt-1 flex justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
          >
            Add to Cart
          </button>
        </div>

        {/* Conditionally render AddItem */}
        {showAlert && alertProps && (
          <AddItem
            {...alertProps}
            onSuccess={() => {
              // Close the modal after a successful action
              setTimeout(() => {
                setShowAlert(false); // Hide the alert after 2 seconds
                onClose(); // Close the modal
              }, 1500);
            }}
            onError={() => {
              // Hide the alert after 2 seconds on error
              setTimeout(() => setShowAlert(false), 2000);
            }}
          />
        )}
      </div>
    </div>
  );
};


export default ItemModal;
