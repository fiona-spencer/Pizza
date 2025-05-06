import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../../redux/slices/cart/cartSlice'; // Import the delete action
import { FaTrash } from 'react-icons/fa';

export default function Cart({ items, activeSection, setActiveSection }) {
  const dispatch = useDispatch(); // Initialize the dispatch hook

  // Calculate total price
  const totalPrice = items.reduce((total, item) => {
    let itemTotal = item.price;
    if (item.addOns?.length > 0) {
      itemTotal += item.addOns.reduce((addOnTotal, addOn) => addOnTotal + addOn.price, 0);
    }
    return total + itemTotal;
  }, 0);

  // Handle deleting an item using Redux
  const handleDeleteItem = (index) => {
    // Dispatch the deleteCartItem action with the item's index
    dispatch(deleteCartItem(index));
  };

  return (
    <div className="mb-6">
      {activeSection === 0 && (
        <div className="mt-4">
          {items.length === 0 ? (
            <p className="text-red-500">No items in your cart.</p>
          ) : (
            <div>
              <ul className="space-y-2 md:space-y-6">
                {items.map((item, index) => (
                  <li key={item._id} className="border-2 border-red-200 p-5 rounded-lg shadow-md bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg lg:text-xl font-semibold text-red-700">{item.name}</h2>
                        <p className="text-red-500 font-medium">Price: ${item.price.toFixed(2)}</p>
                        {item.addOns?.length > 0 && (
                          <ul className="mt-3 text-sm text-red-500 pl-4 list-disc">
                            <li className="font-semibold">Add-Ons:</li>
                            {item.addOns.map((addOn, addOnIndex) => (
                              <li key={addOnIndex}>
                                {addOn.name} (+${addOn.price.toFixed(2)})
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteItem(index)} // Pass the index of the item to delete
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-6 h-6" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-between font-semibold text-red-700">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
