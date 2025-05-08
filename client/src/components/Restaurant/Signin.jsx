import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import { setUser } from '../../redux/slices/user/userSilce';

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch(); // Access Redux dispatch
  const navigate = useNavigate(); // Hook to handle navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials (replace with your actual authentication logic)
    const correctUsername = import.meta.env.VITE_CORRECT_USERNAME;
    const correctPassword = import.meta.env.VITE_CORRECT_PASSWORD;

    // Check if the username and password are correct
    if (username === correctUsername && password === correctPassword) {
      // Example user data, you would replace this with the actual user data from your backend
      const userData = {
        isAdmin: true,  // Marking as admin on successful login
        isAuthenticated: true,  // Marking the user as authenticated
      };

      // Dispatch setUser action to update Redux store
      dispatch(setUser(userData));

      // Redirect to the /restaurant page if credentials are correct
      navigate('/restaurant');
    } else {
      // Set error message if credentials are incorrect
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-4">Hooray for Pizza Day! 🍕</h2>

        {/* Display error message if credentials are wrong */}
        {errorMessage && <p className="text-red-600 text-sm text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
