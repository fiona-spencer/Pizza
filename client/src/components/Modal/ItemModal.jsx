import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { addOns } from "../../constants";
import AddItem from "./AddItem";

const ItemModal = ({ isOpen, category, item, onClose }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState(null);

  if (!isOpen) return null;

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

  const handleAddToCart = () => {
    setAlertProps({ item, addOns: selectedAddOns, quantity });
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
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-600">{item.name}</h2>
          <IoMdCloseCircle
            onClick={onClose}
            className="text-gray-600 hover:text-red-600 cursor-pointer w-6 h-6"
          />
        </div>

        <div className="mt-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>

        <p className="text-gray-700 mt-4 text-[12px]">{item.description}</p>

        {renderAddOnOptions()}

        <div className="mt-4 flex items-center justify-left gap-3">
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

        <div className="mt-6 flex justify-center">
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
