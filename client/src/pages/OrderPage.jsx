import React, { useEffect, useState } from 'react';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/getOrders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data); // Store the orders in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs only once when the component mounts

  if (loading) {
    return (
      <div className="min-h-screen p-6 bg-red-50">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Your Orders</h1>
        <p className="text-lg text-gray-700">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 bg-red-50">
        <h1 className="text-3xl font-bold text-red-700 mb-4">Your Orders</h1>
        <p className="text-lg text-gray-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Your Orders</h1>
      <div className="space-y-6">
        {orders.length === 0 ? (
          <p className="text-lg text-gray-700">You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900">Order #{order._id}</h2>
              <p className="text-sm text-gray-600">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p className="text-lg text-gray-800 mt-2">
                <strong>Order Type:</strong> {order.orderType}
              </p>
              {order.pizza && (
                <div>
                  <strong>Pizza:</strong> {order.pizza.name} - {order.pizza.description}
                </div>
              )}
              {order.wings && <div><strong>Wings:</strong> {order.wings}</div>}
              {order.sides && <div><strong>Sides:</strong> {order.sides}</div>}
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Add-ons:</strong> {order.selectedAddons.join(', ')}</p>
              {order.note && <p><strong>Special Notes:</strong> {order.note}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
