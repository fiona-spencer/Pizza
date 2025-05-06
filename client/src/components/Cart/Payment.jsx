import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import PaymentInfo from '../../stripe/PaymentInfo'; // Import the PaymentInfo component

export default function Payment() {
  // Access the currentUser from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Check if currentUser exists and is authenticated
  if (!currentUser || !currentUser.name || !currentUser.email) {
    // If account info is not complete, return a message or redirect to account info page
    return (
      <div className="w-full max-w-md mx-auto bg-red-100 p-6 rounded-md shadow-md mt-4 text-center">
        <h2 className="text-lg font-semibold text-red-700">
          Complete account information before proceeding to payment.
        </h2>
        {/* Optionally, you could add a button to navigate back to the account info page */}
      </div>
    );
  }

  return (
    <>
      {/* If account info is complete, show the PaymentInfo component */}
      <PaymentInfo />
    </>
  );
}
