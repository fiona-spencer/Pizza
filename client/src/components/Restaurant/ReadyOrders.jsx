import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import StatusButton from './StatusButton';

export default function ReadyOrders() {
  const [readyOrders, setReadyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReadyOrders = async () => {
      try {
        const response = await fetch('/api/order/getOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to fetch orders');

        const data = await response.json();
        const ready = data.filter(order => order.status === 'ready');
        setReadyOrders(ready);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReadyOrders();
  }, []);

  const moveOrderToNextStage = async (orderId, currentStatus) => {
    const statuses = ['pending', 'in-progress', 'ready', 'canceled', 'finished'];
    const nextStatus = statuses[statuses.indexOf(currentStatus) + 1];
    if (!nextStatus) return;

    try {
      const response = await fetch(`/api/order/update/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!response.ok) throw new Error('Failed to update order status');
      setReadyOrders(prev => prev.filter(order => order._id !== orderId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-yellow-500 text-sm">Loading...</div>;
  if (error) return <div className="text-red-500 text-sm">Error: {error}</div>;

  return (
    <div className="p-3 text-black">
      <h2 className="text-xl font-bold text-yellow-600 mb-4">Ready Orders</h2>
      {readyOrders.length === 0 ? (
        <div className="text-sm text-yellow-500">No ready orders available.</div>
      ) : (
        readyOrders.map(order => (
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
