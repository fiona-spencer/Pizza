// components/InProgressOrders.jsx
import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import StatusButton from './StatusButton';

export default function InProgressOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders with 'in-progress' status
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/order/getOrders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        const inProgress = data.filter(order => order.status === 'in-progress');
        setOrders(inProgress);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change
  const moveOrderToStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/order/update/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      // Remove the updated order from the list
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-yellow-500 text-sm">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-sm">Error: {error}</div>;

  return (
<div className="text-black p-2">
<h2 className="text-xl text-blue-600 font-semibold mb-3">
  In Progress Orders
  <span className="text-gray-700 text-base ml-2">({orders.length})</span>
</h2>
  {orders.length === 0 ? (
    <div className="text-center text-yellow-500 text-sm">No orders in progress.</div>
  ) : (
    orders.map((order) => (
      <div key={order._id} className="mb-4 relative"> {/* Position container relative */}
        <OrderCard order={order} />
        <div className="absolute top-4 right-4"> {/* Button overlay with absolute positioning */}
          <StatusButton
            orderId={order._id}
            currentStatus={order.status}
            onStatusChange={moveOrderToStatus}
          />
        </div>
      </div>
    ))
  )}
</div>


  );
}
