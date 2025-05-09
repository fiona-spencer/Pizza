import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { useSelector } from 'react-redux';

export default function Availability() {
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin } = useSelector((state) => state.user); // ✅ Redux auth state

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/signin'); // Redirect if not authenticated or not admin
    }
  }, [isAuthenticated, isAdmin, navigate]);



  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [loadingStoreStatus, setLoadingStoreStatus] = useState(true);
  const [storeStatus, setStoreStatus] = useState(null); // Combines openHour, closeHour, isOpen


  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/api/menu/getItems');
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchStoreStatus = async () => {
      try {
        const response = await fetch('/api/store/openClose');
        if (!response.ok) throw new Error('Failed to fetch store status');
        const data = await response.json();
        setStoreStatus(data);
      } catch (err) {
        console.error(err);
        setError('Error fetching store status');
      } finally {
        setLoadingStoreStatus(false);
      }
    };

    fetchStoreStatus();
  }, []);

  const toggleAvailability = async (menuId, currentAvailability) => {
    try {
      const response = await fetch(`/api/menu/toggleA/${menuId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !currentAvailability }),
      });
      if (!response.ok) throw new Error('Failed to toggle availability');
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

  const saveStoreHours = async (openHour, closeHour) => {
    try {
      const response = await fetch('/api/store/hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ openHour, closeHour }),
      });
      if (!response.ok) throw new Error('Failed to save store hours');
      setStoreStatus((prev) => ({ ...prev, openHour, closeHour }));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const updateStoreStatus = async (isOpen) => {
    try {
      const response = await fetch('/api/store/openClose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOpen }),
      });
      if (!response.ok) throw new Error('Failed to update store status');
      setStoreStatus((prev) => ({ ...prev, isOpen }));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleToggleRestaurantStatus = () => {
    const newStatus = !storeStatus.isOpen;
    updateStoreStatus(newStatus);
    setMenuItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        isAvailable: newStatus,
      }))
    );
  };

  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const openHour = storeStatus?.openHour ?? 0;
  const closeHour = storeStatus?.closeHour ?? 0;
  const restaurantOpen = storeStatus?.isOpen ?? false;

  return (
    <div className="bg-white">
      <div className={`max-w-4xl mx-auto p-4 sm:p-6 bg-red-100 rounded-3xl ${!restaurantOpen ? 'opacity-50' : ''}`}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-red-500 text-center mb-4 md:mb-0">
            Menu Availability
          </h1>
              {/* ✅ Back Button */}
              <div className="absolute top-4 right-4 z-10">
        <Link to="/restaurant" className="text-red-600 hover:text-red-800">
          <RiArrowGoBackLine size={30} className="hover:text-white hover:bg-red-200 hover:p-1 rounded-md" />
        </Link>
      </div>
        </div>

        {/* Store Hours */}
        {!loadingStoreStatus && storeStatus && (
          <div className="mb-4 text-center border-2 border-red-500 bg-white rounded-lg pt-2">
            <h2 className="text-lg md:text-xl font-semibold text-red-500 mb-4">Store Hours</h2>
            <div className="flex flex-col md:flex-row justify-center items-center -space-y-3 md:space-x-6 mb-2">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <label className="flex items-center text-black space-x-2">
                  <span className="text-lg pb-2 font-medium">Open:</span>
                  <select
                    value={openHour}
                    onChange={(e) => saveStoreHours(parseInt(e.target.value), closeHour)}
                    className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{`${i}:00`}</option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center text-black space-x-2">
                  <span className="text-lg pb-2 font-medium">Close:</span>
                  <select
                    value={closeHour}
                    onChange={(e) => saveStoreHours(openHour, parseInt(e.target.value))}
                    className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>{`${i}:00`}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-900 pb-2">
              Current Hours: {openHour}:00 – {closeHour}:00
            </p>
          </div>
        )}

        {/* Toggle Store Status */}
        {storeStatus && (
          <div className="mb-6 text-center">
            <span className="text-lg font-medium text-black px-3">
              Restaurant is {restaurantOpen ? <span className="text-green-600 px-2">Open</span> : <span className="text-red-600">Closed</span>}
            </span>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={restaurantOpen}
                onChange={handleToggleRestaurantStatus}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition duration-300"></div>
              <div className="absolute -top-0.5 -left-1 w-7 h-7 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition duration-300"></div>
            </label>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* Menu Items */}
        {Object.keys(categories).map((category) => (
          <div key={category} className="mb-8 text-red-700">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <ul>
              {categories[category].map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-start sm:items-center mb-4 p-4 border-b-4 border-black"
                >
                  <div className="text-lg mb-2 sm:mb-0">{item.name}</div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-lg ${item.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                    <label className="relative inline-block w-11 h-6">
                      <input
                        type="checkbox"
                        checked={item.isAvailable}
                        onChange={() => toggleAvailability(item._id, item.isAvailable)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition duration-300"></div>
                      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition duration-300"></div>
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
