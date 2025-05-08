import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OrderPlacedTemp } from '../../../../api/utils/OrderPlacedTemp';
import { logout } from '../../redux/slices/user/userSilce';
import { clearCart } from '../../redux/slices/cart/cartSlice';

export default function PushOrder() {
  const cartItems = useSelector((state) => state.cart.items);
  const { currentUser } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      subtotal: parseFloat(subtotal.toFixed(2)),
      tip: parseFloat(tip.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      totalWithTip: parseFloat(totalWithTip.toFixed(2)),
      totalWithTax: parseFloat(totalWithTax.toFixed(2)),
    };
  };

  const prepareOrderData = () => {
    const summary = calculateCartSummary();

    return {
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
      subtotal: summary.subtotal,
      tip: summary.tip,
      totalWithTip: summary.totalWithTip,
      tax: summary.tax,
      totalWithTax: summary.totalWithTax,
      pickUpTime: new Date(),
    };
  };

  useEffect(() => {
    const submitOrder = async () => {
      setIsSubmitting(true);
      setSuccess(null);
      setError(null);

      const orderData = prepareOrderData();

      try {
        const response = await fetch('/api/order/createOrder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error('Failed to place the order.');
        }

        const emailPayload = {
          from: `"${currentUser.name}" <${currentUser.email}>`,
          subject: "Your Order Has Been Placed",
          text: `Thank you for your order, ${currentUser.name}!`,
          html: OrderPlacedTemp({ orderData }),
        };

        const confirmResponse = await fetch('/api/email/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailPayload),
        });

        if (!confirmResponse.ok) {
          throw new Error('Failed to send confirmation email.');
        }

        setSuccess('Confirmation email sent. Redirecting to home...');

        // Wait 5 seconds before clearing session and navigating
        setTimeout(() => {
          dispatch(clearCart());
          dispatch(logout());
          navigate('/');
        }, 5000);
      } catch (err) {
        console.error('❌ Order submission failed:', err.message);
        setError('There was an issue processing your order. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitOrder();
  }, [dispatch, navigate]);

  return (
    <div className="text-sm text-white pt-2">
      {isSubmitting && <p>Placing your order...</p>}
      {success && <p className="mt-2 text-green-500">{success}</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
