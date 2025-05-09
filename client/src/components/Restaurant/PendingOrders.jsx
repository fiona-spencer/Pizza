import React, { useState, useEffect, useRef } from 'react';
import OrderCard from './OrderCard';
import StatusButton from './StatusButton';
import newOrderSound from '../../assets/notification.mp3';

export default function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const audio = useRef(null);
  const prevPendingCount = useRef(0); // Track previous pending count

  useEffect(() => {
    audio.current = new Audio(newOrderSound);
  }, []);

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch('/api/order/getOrders');
      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      const filtered = data.filter(order => order.status === 'pending');
      const currentPendingCount = filtered.length;

      // Only play sound if pending count increased
      if (currentPendingCount > prevPendingCount.current && audio.current) {
        audio.current.play();
      }

      // Update previous count after comparison
      prevPendingCount.current = currentPendingCount;
      setOrders(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrders(); // initial fetch

    const interval = setInterval(() => {
      fetchPendingOrders();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const moveOrderToNextStage = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/order/update/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update order status');

      setOrders(prev => {
        const updated = prev.filter(order => order._id !== orderId);
        prevPendingCount.current = updated.length; // update the count accordingly
        return updated;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-yellow-500 text-sm">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-sm">Error: {error}</div>;

  return (
    <div className="text-black p-2">
      <h2 className="text-xl text-yellow-500 font-semibold mb-3">
        Pending Orders
        <span className="text-gray-700 text-base ml-2">({orders.length})</span>
      </h2>
      {orders.length === 0 ? (
        <div className="text-center text-yellow-500 text-sm">No pending orders available.</div>
      ) : (
        orders.map(order => (
          <div key={order._id} className="mb-4 relative">
            <OrderCard order={order} />
            <div className="absolute md:top-4 right-4 top-24">
              <StatusButton
                orderId={order._id}
                currentStatus={order.status}
                onStatusChange={moveOrderToNextStage}
                userInfo={{
                  name: order.userName,
                  email: order.userEmail,
                  items: order.items,
                }}
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
