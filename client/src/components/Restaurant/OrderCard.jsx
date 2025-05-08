import React from 'react';

export default function OrderCard({ order, onNextStage }) {
  return (
    <div className="bg-[#f6f6f6] rounded-lg shadow-lg p-6 mb-6 border border-gray-200 text-black transition-all duration-100 hover:border-4 hover:border-red-600">
      <h3 className="text-md md:text-xl text-gray-900">
        Order by: <span className="font-bold">{order.userName}</span> ({order.userEmail})
      </h3>
      <p className="text-gray-600 text-sm mt-2">
  Status: 
  <span className={`font-semibold m-1 ${
    order.status === 'pending' ? 'text-yellow-300' :
    order.status === 'in-progress' ? 'text-blue-500' :
    order.status === 'ready' ? 'text-green-500' :
    order.status === 'canceled' ? 'text-red-500' :
    order.status === 'finished' ? 'text-gray-500' : ''
  }`}>
    {order.status}
  </span>
</p>
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


      <h4 className="mt-4 text-md text-gray-600 font-semibold">Items:</h4>
      <div className="order-items space-y-3 mt-2">
        {order.items.map((item, itemIndex) => (
          <div key={itemIndex} className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm  transition-all duration-300 font-semibold">
            <p className="text-lg text-red-500">
              {item.itemName} x {item.quantity} - <span className="font-light">${(item.price * item.quantity).toFixed(2)}</span>
            </p>
            {item.addOns.length > 0 && (
              <div className="mt-2 text-red-700 text-sm">
                {item.addOns.map((addOn, addOnIndex) => (
                  <p key={addOnIndex} className="ml-2">+ {addOn.name} - <span className="font-light">${addOn.price}</span></p>
                ))}
              </div>
            )}
            {item.notes && <p className="ml-2 mt-2 text-gray-600 font-medium text-sm">Notes: {item.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
