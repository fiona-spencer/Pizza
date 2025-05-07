import React from 'react';

const ActiveOrders = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-red-500 mb-4">Active Orders</h2>
      <ul className="space-y-4">
        <li className="bg-red-400 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Order #1 -</span> Customer: John
        </li>
        <li className="bg-red-400 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Order #2 -</span> Customer: Sarah
        </li>
        <li className="bg-red-400 p-4 rounded-lg shadow-md">
          <span className="font-semibold">Order #3 -</span> Customer: Emily
        </li>
      </ul>
    </div>
  );
};

export default ActiveOrders;
