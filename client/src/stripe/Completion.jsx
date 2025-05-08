import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cart/cartSlice';
import PushOrder from '../components/Cart/PushOrder';
import SentOrder from '../components/Cart/SentOrder';

function Completion() {
  const dispatch = useDispatch();
  
  // State to track if SentOrder is complete
  const [isSentOrderComplete, setIsSentOrderComplete] = useState(false);

  // State for the timer countdown
  const [timer, setTimer] = useState(5 * 60);  // 5 minutes in seconds

  // Function to handle when SentOrder is complete
  const handleSentOrderComplete = () => {
    setIsSentOrderComplete(true);  // Mark the order as completed
  };

  // Timer countdown logic
  useEffect(() => {
    // Countdown timer that runs every second
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);  // Cleanup the interval on component unmount
  }, []);

  // Clear cart after the timer expires
  useEffect(() => {
    if (timer === 0) {
      // Clear the cart when the timer reaches 0
      dispatch(clearCart());
    }
  }, [timer, dispatch]);

  // Convert the time remaining in seconds to minutes:seconds format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-semibold text-red-700 mb-4">
          Thank you! 🎉
        </h1>

        {/* SentOrder component */}
        <SentOrder onComplete={handleSentOrderComplete} />

        {/* Conditionally render SendOrder after SentOrder is complete */}
        {isSentOrderComplete && <PushOrder />}

        {/* Timer to show the countdown */}
      </div>
    </div>
  );
}

export default Completion;
