import React, { useState } from 'react';
import OAuth from '../Modal/OAuth'

export default function AccountInfo({ setIsAccountInfoComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // Changed from address to phone
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form is submitted

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // This will be called when OAuth login is successful
  const handleOAuthSuccess = (email) => {
    setFormData({
      ...formData,
      email: email, // Set the email field from OAuth
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if name and email are filled, phone is optional
    if (formData.name && formData.email) {
      setIsAccountInfoComplete(true); // Set completion to true if form is valid
      setIsSubmitted(true); // Mark the form as submitted
    } else {
      setIsAccountInfoComplete(false); // If required fields are not filled, mark as incomplete
    }
  };

  return (
    <div>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* OAuth button to handle email sign-in */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Email</label>
            <OAuth handleOAuthSuccess={handleOAuthSuccess} />
          </div>

          {/* Phone number input field (optional) */}
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700">Phone Number (Optional)</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button type="submit" className="w-full p-2 bg-red-600 text-white rounded">
            Submit
          </button>
        </form>
      ) : (
        // Show the user information after submitting
        <div className="mt-4">
          <h2 className="text-xl font-bold">User Information</h2>
          <div className="mt-2">
            <p className="font-semibold">Name:</p>
            <p>{formData.name}</p>
          </div>
          <div className="mt-2">
            <p className="font-semibold">Email:</p>
            <p>{formData.email}</p>
          </div>
          <div className="mt-2">
            <p className="font-semibold">Phone Number:</p>
            <p>{formData.phone || 'Not provided'}</p>
          </div>
          <button
            onClick={() => setIsSubmitted(false)} // Reset the form when clicking on Edit
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Edit Information
          </button>
        </div>
      )}
    </div>
  );
}
