import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SendOrder() {

  const cartItems = useSelector((state) => state.cart.items);
  const { currentUser } = useSelector((state) => state.user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateCartSummary = () => {
    const subtotal = cartItems.reduce((total, item) => {
      let itemTotal = item.price * item.quantity;
      if (isNaN(itemTotal)) itemTotal = 0;
      return total + itemTotal;
    }, 0);

    const tip = 0;
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

  const prepareOrderData = () => ({
    userEmail: currentUser.email,
    userName: currentUser.name,
    items: cartItems.map(item => ({
      itemName: item.name,
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
    pickUpTime: new Date(),
  });

  useEffect(() => {
    const submitOrder = async () => {
      setIsSubmitting(true);
      const orderData = prepareOrderData();

      console.log('📦 Order Data:', orderData);

      try {
        const response = await fetch('/api/order/createOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const responseBody = await response.text();
        console.log('📝 Server Response:', response.status, responseBody);

        if (!response.ok) {
          throw new Error('Failed to place the order.');
        }

      } catch (err) {
        console.error('❌ Order submission failed:', err.message);
      } finally {
        setIsSubmitting(false);
      }
    };

    submitOrder();
  }, []); // empty dependency array = run once on mount

  return (
    <div className="text-sm text-white">
    </div>
  );
}
