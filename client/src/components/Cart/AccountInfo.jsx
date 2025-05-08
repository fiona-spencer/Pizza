import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../Modal/OAuth';
import { Alert } from 'flowbite-react';
import { createUser, updateUser } from '../../redux/slices/user/userSilce'; // Import both actions
import { v4 as uuidv4 } from 'uuid';
import CombineForm from './CombineForm';

export default function AccountInfo({ setIsAccountInfoComplete }) {
  const [showError, setShowError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOAuthSuccess = (email) => {
    setFormData((prev) => ({ ...prev, email }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email) {
      const userId = currentUser?._id || uuidv4();
      const userData = { ...formData, _id: userId };

      if (!currentUser || !currentUser._id) {
        dispatch(createUser(userData));
      } else {
        dispatch(updateUser(userData));
      }

      setIsAccountInfoComplete(true);
      setShowError(false);
      setEditing(false);
    } else {
      setIsAccountInfoComplete(false);
      setShowError(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#fb9494d3] p-6 rounded-lg shadow-lg mt-8">
      {!currentUser || editing ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {showError && (
            <Alert color="" className="text-sm bg-white text-red-700">
              Please enter name and email to continue.
            </Alert>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white font-semibold text-gray-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white font-semibold text-gray-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Or sign in with OAuth</label>
            <OAuth handleOAuthSuccess={handleOAuthSuccess} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 font-semibold text-gray-500"
              placeholder="e.g. +1 234 567 890"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 text-xs transition duration-200 font-semibold"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-red-800">User Information</h2>
          <div className="mt-4 space-y-3 text-gray-700">
            <div>
              <p className="text-sm font-medium">Name:</p>
              <p className="font-bold ml-2">{currentUser.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email:</p>
              <p className="font-bold ml-2">{currentUser.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone Number:</p>
              <p className="font-bold ml-2">{currentUser.phone || 'Not provided'}</p>
            </div>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="mt-6 w-full bg-white text-gray-600 py-2 rounded-md hover:bg-red-400 transition duration-200 font-xs"
          >
            Edit Information
            <CombineForm/>
          </button>
        </div>
      )}
    </div>
  );
}
