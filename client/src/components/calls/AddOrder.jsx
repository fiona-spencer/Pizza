import React, { useState } from 'react';

export default function AddOrder({ restaurantId, name, price, addOns, category = "pizza", notes = "", quantity = 1 }) {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      restaurantId,
      name,
      price,
      addOns,
      category,
      notes,
      quantity,
    };

    try {
      const response = await fetch('/api/menu/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Item added successfully!' });
        console.log('Server response:', data);
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to add item.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md bg-white">
      <h2 className="text-lg font-semibold">Add Menu Item</h2>
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Submit Item
      </button>

      {status && (
        <p className={status.type === 'success' ? 'text-green-600' : 'text-red-600'}>
          {status.message}
        </p>
      )}
    </form>
  );
}
