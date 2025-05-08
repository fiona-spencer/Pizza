import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard'; // Path to OrderCard component
import StatusButton from './StatusButton'; // Path to StatusButton component

export default function FinishedOrders() {
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch finished orders when the component mounts
  useEffect(() => {
    const fetchFinishedOrders = async () => {
      try {
        const response = await fetch('/api/order/getOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        const finished = data.filter(order => order.status === 'finished');
        setFinishedOrders(finished);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedOrders();
  }, []);

  // Handle status change if needed (if you want to move the order back to a previous stage)
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
        throw new Error('Failed to update order status');
      }

      // Update the list by removing the updated order
      setFinishedOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-yellow-500 text-sm">Loading...</div>;
  if (error) return <div className="text-red-500 text-sm">Error: {error}</div>;

  return (
    <div className="p-3 text-black">
      <h2 className="text-xl font-bold text-green-700 mb-4">Finished Orders</h2>
      {finishedOrders.length === 0 ? (
        <div className="text-sm text-yellow-500">No finished orders available.</div>
      ) : (
        finishedOrders.map((order) => (
          <div key={order._id} className="mb-4 relative"> {/* Position container relative */}
            <OrderCard order={order} />
            {/* Optional: Add StatusButton if you need a way to go back to other stages */}
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
