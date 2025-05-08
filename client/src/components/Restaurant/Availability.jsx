import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Availability() {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu/getItems');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchMenuItems();
  }, []);

  const toggleAvailability = async (menuId, currentAvailability) => {
    try {
      const response = await fetch(`/api/menu/toggleA/${menuId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isAvailable: !currentAvailability, // Toggle the availability
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle availability');
      }

      // Update the availability state after toggling
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item._id === menuId ? { ...item, isAvailable: !currentAvailability } : item
        )
      );
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
<div className='bg-white'>
  <div className="max-w-4xl mx-auto p-6 bg-red-100 rounded-3xl">
   <div className="flex justify-evenly ml-56">
   <h1 className="text-3xl font-semibold text-center mb-6 text-red-500 pr-40">Menu Availability</h1>
    <button
          onClick={() => navigate('/restaurant')}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          ← Back
        </button>
   </div>
    {error && <p className="text-red-600 text-center">{error}</p>}

    {Object.keys(categories).map((category) => (
      <div key={category} className="mb-8 text-red-700">
        <h2 className="text-2xl font-bold mb-4">{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
        <ul>
          {categories[category].map((item) => (
            <li key={item._id} className="flex justify-between items-center mb-4 p-4 border-b-4 border-black">
              <div className="flex items-center space-x-4">
                <span className="text-xl">{item.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-lg ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </span>
                <label className="relative -top-6 inline-block w-11 h-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isAvailable}
                    onChange={() => toggleAvailability(item._id, item.isAvailable)}
                    className="opacity-0 w-0 h-0"
                  />
                  <span className="toggle-label block w-12 h-6 bg-gray-300 rounded-full transition duration-300 ease-in-out">
                    <span className="toggle-dot absolute left-0 top-6 w-6 h-6 bg-white rounded-full transition-transform duration-300 ease-in-out"></span>
                  </span>
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</div>


  );
}
