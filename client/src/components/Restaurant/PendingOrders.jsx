import React, { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import StatusButton from './StatusButton'; // Import the StatusButton component

export default function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/order/getOrders');
        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        const filtered = data.filter(order => order.status === 'pending');
        setOrders(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const moveOrderToNextStage = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/order/update/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update order status');
      
      // Update the orders list by removing the updated order
      setOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-yellow-500 text-sm">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-sm">Error: {error}</div>;

  return (
    <div className="text-black p-2">
      <h2 className="text-xl text-red-600 font-semibold mb-3">Pending Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center text-yellow-500 text-sm">No pending orders available.</div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="mb-4 relative"> {/* Position container relative */}
            <OrderCard order={order} />
            <div className="absolute top-4 right-4"> {/* Button overlay with absolute positioning */}
              <StatusButton
                orderId={order._id}
                currentStatus={order.status}
                onStatusChange={moveOrderToNextStage}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
