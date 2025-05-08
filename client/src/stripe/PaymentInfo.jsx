import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "./CheckoutForm"; // assuming CheckoutForm is in the same folder
import { useSelector } from "react-redux";

function PaymentInfo() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [tipOption, setTipOption] = useState('none');
  const [customTip, setCustomTip] = useState('');

  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the total price (subtotal)
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Constants
  const TAX_RATE = 0.13; // Tax rate (13%)
  const totalPrice = calculateTotalPrice(); // Total price before tax

  // Tip is calculated before tax (on subtotal)
  const tipPercent = tipOption === 'custom' ? 0 : tipOption === 'none' ? 0 : Number(tipOption) / 100;
  const tipAmount = tipOption === 'custom' && customTip !== '' ? parseFloat(customTip) : totalPrice * tipPercent;

  // Tax is still calculated only on subtotal
  const taxAmount = totalPrice * TAX_RATE;
  const finalTotal = totalPrice + taxAmount + (isNaN(tipAmount) ? 0 : tipAmount);

  // Fetch the Stripe public key and client secret from backend
  useEffect(() => {
    fetch("/api/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  // Fetch client secret for payment intent
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: finalTotal * 100 }), // Send the total amount (in cents)
        });

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (finalTotal) {
      createPaymentIntent();
    }
  }, [finalTotal]);

  return (
    <div className="bg-white rounded-2xl mt-4 p-6 max-w-lg mx-auto">
      <h1 className="text-red-600 text-2xl font-semibold mb-6">Confirm Payment Details</h1>

      {/* Summary */}
      <div className="mb-4 text-gray-600">
        <div className="flex justify-between text-md font-semibold mb-2">
          <span>Subtotal:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        {/* Tip Selection */}
        <div className="mb-4">
          <p className="text-sm mb-2">Add a tip:</p>
          <div className="flex gap-2 flex-wrap">
            {['none', 5, 10, 15, 'custom'].map((option) => (
              <button
                key={option}
                className={`px-3 py-1 rounded-full border text-sm ${
                  tipOption === option
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                }`}
                onClick={() => setTipOption(option)}
              >
                {option === 'none' ? 'No Tip' : option === 'custom' ? 'Custom' : `${option}%`}
              </button>
            ))}
          </div>
          {tipOption === 'custom' && (
            <input
              type="number"
              step="0.01"
              placeholder="Enter tip amount"
              value={customTip}
              onChange={(e) => setCustomTip(e.target.value)}
              className="mt-2 w-full px-3 py-1 border rounded-md"
            />
          )}
        </div>

        {/* Tax and Tip Summary */}
        <div className="flex justify-between text-sm  mb-1">
          <span>Tip:</span>
          <span>${isNaN(tipAmount) ? '0.00' : tipAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm  mb-1">
          <span>Tax (13%):</span>
          <span>${taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-black">
          <span>TOTAL:</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Stripe Checkout Form */}
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default PaymentInfo;
