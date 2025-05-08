import React from 'react';

export default function OrderCard({ order, onNextStage }) {
  const handleNext = () => {
    if (onNextStage) onNextStage(order._id, order.status);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200 text-black transition-all duration-100 hover:border-4 hover:border-red-600">
      <h3 className="text-xl text-red-600">
        Order by: <span className="font-bold">{order.userName}</span> ({order.userEmail})
      </h3>
      <p className="text-gray-600 text-sm mt-2">Status: <span className="font-semibold">{order.status}</span></p>
      <p className="text-gray-600 text-sm">Subtotal: <span className="font-semibold">${order.subtotal.toFixed(2)}</span></p>
      <p className="text-gray-600 text-sm">Tip: <span className="font-semibold">${order.tip.toFixed(2)}</span></p>
      <p className="text-gray-600 text-sm">Total with Tax: <span className="font-semibold">${order.totalWithTax.toFixed(2)}</span></p>
      <p className="text-gray-600 text-sm">
  Order Created:{" "}
  <span className="font-semibold">
    {new Date(order.pickUpTime).toLocaleString([], {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })}
  </span>
</p>


      <h4 className="mt-4 text-md text-yellow-600 font-semibold">Items:</h4>
      <div className="order-items space-y-3 mt-2">
        {order.items.map((item, itemIndex) => (
          <div key={itemIndex} className="bg-gray-50 p-4 rounded-lg border border-gray-300 shadow-sm  transition-all duration-300">
            <p className="text-sm text-red-500">
              {item.itemName} x {item.quantity} - <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </p>
            {item.addOns.length > 0 && (
              <div className="mt-2 text-yellow-500 text-sm">
                {item.addOns.map((addOn, addOnIndex) => (
                  <p key={addOnIndex} className="ml-2">{addOn.name} - <span className="font-semibold">${addOn.price}</span></p>
                ))}
              </div>
            )}
            {item.notes && <p className="mt-2 text-gray-600 text-sm">Notes: {item.notes}</p>}
          </div>
        ))}
      </div>

      {order.status !== 'finished' && onNextStage && (
        <button
          onClick={handleNext}
          className="mt-6 px-6 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
        >
          Move to Next Stage
        </button>
      )}
    </div>
  );
}
