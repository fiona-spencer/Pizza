import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../components/Cart/Cart';
import Payment from '../components/Cart/Payment';
import AccountInfo from '../components/Cart/AccountInfo';
import { Button } from 'flowbite-react';
import { RiArrowGoBackLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cart/cartSlice';
import { FaCircleArrowRight } from "react-icons/fa6";

export default function CartPage() {
  const [step, setStep] = useState(0); // 0: Cart, 1: Account, 2: Payment
  const [activeSection, setActiveSection] = useState(0);
  const [isAccountInfoComplete, setIsAccountInfoComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const items = useSelector(state => state.cart.items);
  const error = items.length === 0 ? 'No items in the cart' : null;
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    // If the account info is already complete, set formData
    if (isAccountInfoComplete) {
      setFormData({
        name: 'John Doe', // Example: These should be the saved values
        email: 'johndoe@example.com',
        phone: '+1 234 567 890'
      });
    }
  }, [isAccountInfoComplete]);

  return (
    <div className="min-h-screen bg-white relative">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/" className="text-red-600 hover:text-red-800">
          <RiArrowGoBackLine size={30} className='hover:text-white' />
        </Link>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-600 text-center">🍕 Your Cart</h1>

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
                    setActiveSection={setActiveSection}
                    activeSection={activeSection}
                  />

                  <div className="-mt-4 text-center flex">
                    <button
                      className='text-white bg-[#060606ae] text-xs py-1 px-2 font-semibold rounded-md'
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </div>

                  <div className="text-right flex justify-end">
                    <button
                      size='sm'
                      className="text-red-600 outline-dashed flex justify-center items-center gap-2 rounded-md px-2 py-1"
                      onClick={() => {
                        setStep(1);
                        setActiveSection(1);
                      }}
                    >
                      <span>Next</span>
                      <FaCircleArrowRight className="ml-2 h-4 w-4" />
                    </button>
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
                      setIsAccountInfoComplete={setIsAccountInfoComplete}
                      formData={formData}
                      setFormData={setFormData} // Passing the formData and setter
                    />
                    <div className="mt-4 text-right flex justify-end">
                      <button
                        size='sm'
                        className="text-red-600 outline-dashed flex justify-center items-center gap-2 rounded-md px-2 py-1"
                        onClick={() => {
                          setStep(2);
                          setActiveSection(2);
                        }}
                      >
                        <span>Next</span>
                        <FaCircleArrowRight className="ml-2 h-4 w-4" />
                      </button>
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
                  <div>
                    <Payment />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
