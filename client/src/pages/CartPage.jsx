import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Importing the Link component for navigation
import Cart from '../components/Cart/Cart';
import Payment from '../components/Cart/Payment';
import AccountInfo from '../components/Cart/AccountInfo';
import { Button } from 'flowbite-react';  // Importing Flowbite Button component
import { RiArrowGoBackLine } from "react-icons/ri";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // No section is active by default

  // Fetch menu items after initial render
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch('/api/menu/getItems');
        if (!res.ok) throw new Error('Failed to fetch menu items');
        const data = await res.json();

        // If no items, show "No items in the cart"
        if (data.length === 0) {
          setError('No items in the cart');
        } else {
          setItems(data);
        }
      } catch (err) {
        // If fetch fails, show "No items in the cart"
        setError('No items in the cart');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []); // Empty dependency array ensures this runs after initial render

  const handleProceed = () => {
    alert('Proceeding to Payment');
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Go Back Button */}
      <div className="absolute top-4 right-4 z-10">
        <Link to="/" className="text-red-600 hover:text-red-800">
          <RiArrowGoBackLine size={30} className='hover:text-white'/>
        </Link>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">🍕 Your Cart</h1>

        {/* Show loading state while fetching */}
        {loading && <div className="p-4 text-red-600">Loading...</div>}

        {/* Show error message if fetch fails */}
        {error && <div className="p-4 text-red-600">{error}</div>}

        {/* Only show the buttons if there are items in the cart */}
        {items.length > 0 && (
          <>
            {/* Accordion-style Button to toggle Order section */}
            <div className="mb-4">
              <Button
                onClick={() => setActiveSection(activeSection === 0 ? null : 0)}
                color="red"
                className="w-full text-center px-5 rounded-md shadow-md border-b border-red-300 focus:outline-none"
              >
                Your Order
              </Button>
              {activeSection === 0 && (
                <Cart
                  items={items}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              )}
            </div>

            {/* Accordion-style Button to toggle Account Info section */}
            <div className="mb-4">
              <Button
                onClick={() => setActiveSection(activeSection === 1 ? null : 1)}
                color="red"
                className="w-full text-center px-5 rounded-md shadow-md border-b border-red-300 focus:outline-none"
              >
                Account Info
              </Button>
              {activeSection === 1 && (
                <AccountInfo
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              )}
            </div>

            {/* Accordion-style Button to toggle Payment section */}
            <div className="mb-4">
              <Button
                onClick={() => setActiveSection(activeSection === 2 ? null : 2)}
                color="red"
                className="w-full text-center px-5 rounded-md shadow-md border-b border-red-300 focus:outline-none"
              >
                Payment
              </Button>
              {activeSection === 2 && (
                <Payment
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  handleProceed={handleProceed}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
