import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import {Button} from 'flowbite-react'

export default function SendOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function
  
  // Get cart data and user data from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user); // Assuming user slice exists in the Redux store
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  // Calculate subtotal, tax, and total from cart items
  const calculateCartSummary = () => {
    const subtotal = cartItems.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;
      if (isNaN(itemTotal)) itemTotal = 0;
      return total + itemTotal;
    }, 0);

    const tip = 0;  // You can replace this with actual user input for tip
    const tax = subtotal * 0.13;
    const totalWithTip = subtotal + tip;
    const totalWithTax = totalWithTip + tax;

    return {
      subtotal,
      tip,
      tax,
      totalWithTip,
      totalWithTax,
    };
  };

  // Navigate back to the home page
  const handleGoBackHome = () => {
    navigate('/'); // This will redirect the user to the homepage
  };

  return (
    <div className="order-confirmation-container text-black">
      <h1 className="text-2xl font-semibold">Your Order Has Been Sent</h1>
      <div className="mt-4 mx-4">
        {/* Display cart summary */}
        <div className="flex justify-between font-semibold">
          <span>Subtotal:</span>
          <span>${calculateCartSummary().subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tip:</span>
          <span>${calculateCartSummary().tip.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (13%):</span>
          <span>${calculateCartSummary().tax.toFixed(2)}</span>
        </div>
        <div className="mt-4 flex justify-between font-bold">
          <span>Total:</span>
          <span>${calculateCartSummary().totalWithTax.toFixed(2)}</span>
        </div>
      </div>

      {/* Show error if any */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Button to go back home */}
      <Button
      color='red'
      size='xs'
        onClick={handleGoBackHome}
        className="mt-6  text-white py-2 px-4 rounded-lg w-full flex justify-center items-center"
      >
        Go Back to Resaurant Page
      </Button>
    </div>
  );
}
