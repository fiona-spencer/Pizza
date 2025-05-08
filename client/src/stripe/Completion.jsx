import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cart/cartSlice'; // Import clearCart
import SentOrder from "../components/Cart/SentOrder";
import SendOrder from '../components/Cart/SendOrder';

function Completion() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Clear cart on mount
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-red-700 mb-4">
          Thank you! 🎉
        </h1>

        <SentOrder />
        <SendOrder />

        <p className="mt-4 text-gray-600">
          Your order is being processed. We’ll notify you once it's ready.
        </p>
      </div>
    </div>
  );
}

export default Completion;
