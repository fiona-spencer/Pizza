import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard'; // Assuming the path is correct
import StatusButton from './StatusButton'; // Assuming the path is correct

export default function CanceledOrders() {
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders with 'canceled' status
  useEffect(() => {
    const fetchCanceledOrders = async () => {
      try {
        const response = await fetch('/api/order/getOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        const canceled = data.filter(order => order.status === 'canceled');
        setCanceledOrders(canceled);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCanceledOrders();
  }, []);

  // Handle status change (e.g., move canceled orders to a new status)
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

      // Remove the updated order from the list
      setCanceledOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-yellow-500 text-sm">Loading...</div>;
  if (error) return <div className="text-red-500 text-sm">Error: {error}</div>;

  return (
    <div className="p-3 text-black">
      <h2 className="text-xl font-bold text-red-700 mb-4">Canceled Orders</h2>
      {canceledOrders.length === 0 ? (
        <div className="text-sm text-yellow-500">No canceled orders available.</div>
      ) : (
        canceledOrders.map((order) => (
          <div key={order._id} className="mb-4 relative"> {/* Position container relative */}
            <OrderCard order={order} />
            {/* Optional: Add StatusButton to move canceled orders to another status */}
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
