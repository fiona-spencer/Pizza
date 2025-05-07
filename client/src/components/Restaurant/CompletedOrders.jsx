import React from 'react';

const CompletedOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-red-500 mb-4">Completed Orders</h2>
      <ul className="space-y-4">
        <li className="bg-red-400 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Order #5 -</span> Customer: Mike
        </li>
        <li className="bg-red-400 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Order #4 -</span> Customer: Lisa
        </li>
      </ul>
    </div>
  );
};

export default CompletedOrders;
