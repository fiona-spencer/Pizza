import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/slices/cart/cartSlice';

export default function SendOrder() {
  const dispatch = useDispatch();

  // Get cart data and user data from Redux store
  const cartItems = useSelector((state) => state.cart.items);
  const { currentUser } = useSelector((state) => state.user);

  // Define the loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate the subtotal, tip, tax, and total
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

  // Prepare the order data
  const prepareOrderData = () => {
    // User and restaurant IDs are set automatically on the backend
    return {
      userEmail: currentUser.email,
      userName: currentUser.name,
      items: cartItems.map(item => ({
        itemName: item.name,  // itemName instead of menuItemId
        quantity: item.quantity,
        price: item.price,
        addOns: item.addOns || [],
        notes: item.notes || '',
      })),
      status: 'pending',
      subtotal: calculateCartSummary().subtotal,
      tip: calculateCartSummary().tip,
      totalWithTip: calculateCartSummary().totalWithTip,
      tax: calculateCartSummary().tax,
      totalWithTax: calculateCartSummary().totalWithTax,
      pickUpTime: new Date(),  // You can add logic to take pickUpTime from the user
    };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setIsSubmitting(true);

    const orderData = prepareOrderData();

    console.log(orderData)

    try {
      const response = await fetch('/api/order/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place the order. Please try again.');
      }

      // If the order is successfully placed, clear the cart and redirect
      dispatch(clearCart()); // Clear the cart after a successful order
    } catch (err) {
      console.error('Order submission failed:', err.message);
      // Handle error (e.g., show error message in UI or log it)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* You can add a button to trigger the order submission */}
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Place Order'}
      </button>
    </div>
  );
}
