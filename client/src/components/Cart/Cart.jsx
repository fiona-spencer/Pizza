import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartItem, updateCartItemQuantity } from '../../redux/slices/cart/cartSlice';
import { FaRegTrashCan } from "react-icons/fa6";

export default function Cart({ items, activeSection, setActiveSection }) {
  const dispatch = useDispatch(); // Initialize the dispatch hook

  // Calculate total price
  const totalPrice = items.reduce((total, item) => {
    let itemTotal = item.price * item.quantity; // Adjust price based on quantity
    
    // Ensure item price is valid
    if (isNaN(itemTotal)) {
      itemTotal = 0;
    }

    // Add price from addOns if available
    // if (item.addOns?.length > 0) {
    //   itemTotal += item.addOns.reduce((addOnTotal, addOn) => {
    //     const addOnPrice = addOn.price;
    //     return addOnTotal + (isNaN(addOnPrice) ? 0 : addOnPrice);
    //   }, 0);
    // }
    
    return total + itemTotal;
  }, 0);

  // Handle deleting an item using Redux
  const handleDeleteItem = (index) => {
    // Dispatch the deleteCartItem action with the item's index
    dispatch(deleteCartItem(index));
  };

  // Handle updating the quantity of an item
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ index: items.indexOf(item), quantity: newQuantity }));
    }
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
                    <div>
                      <div className="flex justify-between items-center mb-2"> {/* Flex container for name and quantity */}
                        <h2 className="text-lg lg:text-xl font-semibold text-red-700">{item.name}</h2>
                        
                        {/* Quantity selector */}
                        <div className="flex items-center gap-1 bg-red-200 rounded-md p-1 px-3">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="text-red-600 text-sm font-extrabold mr-2"
                          >
                            -
                          </button>
                          <span className="text-red-500 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="text-red-600 text-sm font-bold ml-2"
                          >
                            +
                          </button>
                        </div>
                      </div>

                     

                      {item.addOns?.length > 0 && (
                        <ul className="mt-2 text-sm text-red-500 pl-3 list-disc">
                          <p className="font-semibold">Add-Ons:</p>
                          {item.addOns.map((addOn, addOnIndex) => (
                            <li key={addOnIndex}>
                              {addOn.name} (+${isNaN(addOn.price) ? '0.00' : addOn.price.toFixed(2)})
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center justify-between mt-3 -mb-2">
                      <div className="flex justify-between items-center space-x-2">
                        {/* Price section */}
                        <p className="text-red-600 font-bold">
                          Price: ${(item.price * item.quantity).toFixed(2)} {/* Adjust price based on quantity */}
                        </p>
                      </div>

                      {/* Trash button placed below quantity */}
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDeleteItem(index)} // Pass the index of the item to delete
                          className="text-red-600 hover:text-red-700"
                        >
                          <FaRegTrashCan className="w-5 h-5" />
                        </button>
                      </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex justify-between font-semibold text-red-700">
                <span>Total:</span>
                <span>${isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
