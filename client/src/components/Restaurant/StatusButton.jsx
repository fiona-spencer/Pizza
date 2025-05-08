import React from 'react';
import { Dropdown } from 'flowbite-react';
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineShoppingCart, HiOutlineXCircle, HiOutlineCheckCircle } from 'react-icons/hi';

export default function StatusButton({ orderId, currentStatus, onStatusChange }) {
  const statuses = [
    { name: 'pending', icon: <HiOutlineClock className="w-5 h-5 mr-2 text-yellow-500" /> },
    { name: 'in-progress', icon: <HiOutlineClipboardCheck className="w-5 h-5 mr-2 text-blue-500" /> },
    { name: 'ready', icon: <HiOutlineShoppingCart className="w-5 h-5 mr-2 text-green-500" /> },
    { name: 'canceled', icon: <HiOutlineXCircle className="w-5 h-5 mr-2 text-red-500" /> },
    { name: 'finished', icon: <HiOutlineCheckCircle className="w-5 h-5 mr-2 text-gray-100" /> },
  ];

  const handleStatusChange = async (newStatus) => {
    if (onStatusChange) {
      await onStatusChange(orderId, newStatus);
    }
  };

  return (
    <Dropdown color='dark' label={`Change Status`} size="xs" className="w-fit">
      {statuses.map(
        (status) =>
          status.name !== currentStatus && (
            <Dropdown.Item
              key={status.name}
              onClick={() => handleStatusChange(status.name)}
              className="flex items-center p-2 hover:bg-gray-100"
            >
              {status.icon}
              <span>{status.name.charAt(0).toUpperCase() + status.name.slice(1)}</span>
            </Dropdown.Item>
          )
      )}
    </Dropdown>
  );
}
