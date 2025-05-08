import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get the user data from Redux
import SentOrder from "../components/Cart/SentOrder";  // Importing the SentOrder component
import SendOrder from '../components/Cart/SendOrder';

function Completion() {
  // Access user data from Redux store
  const user = useSelector((state) => state.user); // Assuming user slice exists in the Redux store

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-red-700 mb-4">
          Thank you! 🎉
        </h1>
        
        {/* The SentOrder component will handle the order submission */}
        
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
