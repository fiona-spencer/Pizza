import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import Payment from '../components/Cart/Payment';
import AccountInfo from '../components/Cart/AccountInfo';
import { Button } from 'flowbite-react';
import { RiArrowGoBackLine } from "react-icons/ri";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0); // Tracks completed step (0: Order, 1: Account, 2: Payment)
  const [activeSection, setActiveSection] = useState(null);
  const [isAccountInfoComplete, setIsAccountInfoComplete] = useState(false); // Tracks if account info is complete

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch('/api/menu/getItems');
        if (!res.ok) throw new Error('Failed to fetch menu items');
        const data = await res.json();
        if (data.length === 0) {
          setError('No items in the cart');
        } else {
          setItems(data);
        }
      } catch (err) {
        setError('No items in the cart');
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const handleProceed = () => {
    alert('Proceeding to Payment');
  };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/" className="text-red-600 hover:text-red-800">
          <RiArrowGoBackLine size={30} className='hover:text-white'/>
        </Link>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">🍕 Your Cart</h1>

        {loading && <div className="p-4 text-red-600">Loading...</div>}
        {error && <div className="p-4 text-red-600">{error}</div>}

        {items.length > 0 && (
          <>
            {/* Step 0: Cart */}
            <div className="mb-4">
              <Button
                onClick={() => setActiveSection(activeSection === 0 ? null : 0)}
                color="red"
                className="w-full"
              >
                Your Order
              </Button>
              {activeSection === 0 && (
                <>
                  <Cart
                    items={items}
                    setItems={setItems}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                  />
                  <div className="mt-4 text-right">
                    <Button color="red" onClick={() => {
                      setActiveSection(null);
                      setStep(1); // Proceed to next step
                    }}>
                      Next
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Step 1: Account Info */}
            {step >= 1 && (
              <div className="mb-4">
                <Button
                  onClick={() => setActiveSection(activeSection === 1 ? null : 1)}
                  color="red"
                  className="w-full"
                >
                  Account Info
                </Button>
                {activeSection === 1 && (
                  <>
                    <AccountInfo
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                      setIsAccountInfoComplete={setIsAccountInfoComplete} // Pass down the function
                    />
                    <div className="mt-4 text-right">
                      <Button
                        color="red"
                        onClick={() => {
                          if (isAccountInfoComplete) {
                            setActiveSection(null);
                            setStep(2); // Proceed to Payment
                          } else {
                            alert('Please complete your account info to proceed');
                          }
                        }}
                        disabled={!isAccountInfoComplete} // Disable the button if account info is not complete
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Payment */}
            {step >= 2 && (
              <div className="mb-4">
                <Button
                  onClick={() => setActiveSection(activeSection === 2 ? null : 2)}
                  color="red"
                  className="w-full"
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
            )}
          </>
        )}
      </div>
    </div>
  );
}
