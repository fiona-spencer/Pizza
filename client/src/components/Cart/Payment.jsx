import React, { useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';

export default function Payment({ activeSection, setActiveSection, handleProceed }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <div className="mb-6">
      {activeSection === 2 && (
        <div className="mt-4 space-y-4 w-full">
          {/* Card Number Field */}
          <div>
            <Label htmlFor="cardNumber" value="Credit Card Number" />
            <TextInput
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9876 5432"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border-2 border-red-500 focus:ring-2 focus:ring-red-500 p-3 w-full"
            />
          </div>

          {/* Expiration Date Field */}
          <div>
            <Label htmlFor="expiration" value="Expiration Date" />
            <TextInput
              id="expiration"
              type="text"
              placeholder="MM/YY"
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="border-2 border-red-500 focus:ring-2 focus:ring-red-500 p-3 w-full"
            />
          </div>

          {/* CVV Field */}
          <div>
            <Label htmlFor="cvv" value="CVV" />
            <TextInput
              id="cvv"
              type="password"
              placeholder="***"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="border-2 border-red-500 focus:ring-2 focus:ring-red-500 p-3 w-full"
            />
          </div>

          {/* Proceed Button */}
          <div className="mt-8 flex justify-center">
            <Button color="failure" size="lg" onClick={handleProceed}>
              Proceed to Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
