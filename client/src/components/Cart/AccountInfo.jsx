import React, { useState } from 'react';
import OAuth from '../OAuth';
import { Button } from 'flowbite-react';

export default function AccountInfo({ activeSection, setActiveSection }) {
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="mb-6">
      {activeSection === 1 && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-lg space-y-6 w-full border-2 border-red-400">
          {/* First Name Field */}
          <div>
            <label htmlFor="firstName" className="text-red-700 text-md font-semibold">
              First Name (required)
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border-2 border-red-500 focus:ring-2 focus:ring-white p-3 w-full mt-2 rounded-md text-black"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="text-red-700 text-md font-semibold">
              Phone Number (optional)
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 416-123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-2 border-red-500 focus:ring-2 focus:ring-white p-3 w-full mt-2 rounded-md text-black"
            />
          </div>

          {/* OAuth Google Sign-In Button */}
          <div className="mt-2">
            <label htmlFor="oauth" className="text-red-700 text-md font-semibold">
              Email Authentication
            </label>
            <div className="mt-2">
              <OAuth userType="customer" /> {/* Pass userType as needed */}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
