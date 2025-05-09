import React from 'react';

export default function OrderCard({ order, onNextStage }) {
  return (
    <div className="bg-[#ebe7e7] rounded-lg shadow-xl p-6 mb-6 border border-gray-200 text-black transition-all duration-100 hover:border-4 hover:border-red-600 sm:p-4  sm:w-full">
      {/* User Info */}
      <h3 className="text-sm md:text-lg text-gray-600">
        Order by: <span className="font-semibold text-gray-700">{order.userName}</span>
      </h3>
      <span> ({order.userEmail})</span>

      <p className="text-gray-500 text-sm mt-2">
        Status: 
        <span className={`font-semibold m-1 uppercase ${
          order.status === 'pending' ? 'text-yellow-300' :
          order.status === 'in-progress' ? 'text-blue-500' :
          order.status === 'ready' ? 'text-green-500' :
          order.status === 'canceled' ? 'text-red-500' :
          order.status === 'finished' ? 'text-gray-500' : ''
        }`}>
          {order.status}
        </span>
      </p>
      <p className="text-gray-500 text-sm">Subtotal: <span className="font-semibold">${order.subtotal.toFixed(2)}</span></p>
      <p className="text-gray-500 text-sm">Tip: <span className="font-semibold">${order.tip.toFixed(2)}</span></p>
      <p className="text-gray-500 text-sm">Total with Tax: <span className="font-semibold">${order.totalWithTax.toFixed(2)}</span></p>
      <p className="text-gray-500 text-sm">
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

      {/* Items Section */}
      <h4 className="mt-4 text-md text-gray-800 font-semibold">Items:</h4>
      <div className="order-items space-y-3 mt-2">
        {order.items.map((item, itemIndex) => (
          <div key={itemIndex} className="bg-white p-2 sm:p-4 rounded-lg border-2 border-gray-300 shadow-sm  transition-all duration-300">
            <p className="text-lg text-red-600 font-semibold">
              {item.itemName} x {item.quantity} -&nbsp;
              <span className="font-extralight">
                ${(item.price - item.addOns.reduce((total, addOn) => total + addOn.price, 0)) * item.quantity}
              </span>
            </p>
            {item.addOns.length > 0 && (
              <div className="mt-2 text-red-700 text-sm">
                {item.addOns.map((addOn, addOnIndex) => (
                  <p key={addOnIndex} className="ml-2 font-medium">+ {addOn.name} - <span className="font-light">${addOn.price}</span></p>
                ))}
              </div>
            )}
            {item.notes && <p className="ml-2 mt-2 text-gray-900 font-normal text-sm italic">Notes: {item.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
