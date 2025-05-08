import React, { useState, useEffect } from 'react';

export default function PendingOrders() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the orders when the component mounts
    const fetchPendingOrders = async () => {
      try {
        const response = await fetch('/api/order/getOrders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication token if required
            // 'Authorization': `Bearer ${authToken}`,
          },
        });

        console.log('Response status:', response.status); // Log the response status
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();

        console.log('Fetched orders:', data); // Log the data to see the response

        // Filter the orders to show only those with 'pending' status
        const pending = data.filter(order => order.status === 'pending');
        console.log('Filtered pending orders:', pending); // Log the filtered pending orders
        setPendingOrders(pending);
      } catch (err) {
        console.error('Error:', err.message); // Log the error message
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-yellow-500 text-sm">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-sm">Error: {error}</div>;
  }

  return (
    <div className="text-black p-2">
      <h2 className="text-xl text-red-600 font-semibold mb-3">Pending Orders</h2>
      {pendingOrders.length === 0 ? (
        <div className="text-center text-yellow-500 text-sm">No pending orders available.</div>
      ) : (
        pendingOrders.map((order, index) => (
          <div key={index} className="order-card bg-white shadow-sm p-4 rounded-md mb-3 border border-gray-200">
            <h3 className="text-lg text-red-600 font-semibold">{`Order by ${order.userName} (${order.userEmail})`}</h3>
            <p className="text-gray-600 text-sm">Status: {order.status}</p>
            <p className="text-gray-600 text-sm">Subtotal: ${order.subtotal.toFixed(2)}</p>
            <p className="text-gray-600 text-sm">Tip: ${order.tip.toFixed(2)}</p>
            <p className="text-gray-600 text-sm">Total with Tax: ${order.totalWithTax.toFixed(2)}</p>
            <p className="text-gray-600 text-sm">Pick-up Time: {new Date(order.pickUpTime).toLocaleString()}</p>
            <h4 className="mt-3 text-md text-yellow-600">Items:</h4>
            <div className="order-items space-y-2">
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="order-item bg-gray-100 p-3 rounded-sm border border-gray-300">
                  <p className="text-sm text-red-500">{item.itemName} x {item.quantity} - ${item.price * item.quantity}</p>
                  {item.addOns.length > 0 && (
                    <div className="add-ons mt-2 text-yellow-500 text-sm">
                      {item.addOns.map((addOn, addOnIndex) => (
                        <p key={addOnIndex}>{addOn.name} - ${addOn.price}</p>
                      ))}
                    </div>
                  )}
                  {item.notes && <p className="mt-2 text-gray-600 text-sm">Notes: {item.notes}</p>}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
