import React from 'react';
import { Dropdown } from 'flowbite-react';
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineShoppingCart, HiOutlineXCircle, HiOutlineCheckCircle } from 'react-icons/hi';
import { OrderReadyTemp } from '../../../../api/utils/OrderReadyTemp'; // Assuming it's in the same directory

export default function StatusButton({ orderId, currentStatus, onStatusChange, userInfo }) {
  // Define the available statuses
  const statuses = [
    { name: 'pending', icon: <HiOutlineClock className="w-5 h-5 mr-2 text-yellow-500" /> },
    { name: 'in-progress', icon: <HiOutlineClipboardCheck className="w-5 h-5 mr-2 text-blue-500" /> },
    { name: 'ready', icon: <HiOutlineShoppingCart className="w-5 h-5 mr-2 text-green-500" /> },
    { name: 'canceled', icon: <HiOutlineXCircle className="w-5 h-5 mr-2 text-red-500" /> },
    { name: 'finished', icon: <HiOutlineCheckCircle className="w-5 h-5 mr-2 text-gray-100" /> },
  ];

  // Handle status change and send the email if necessary
  const handleStatusChange = async (newStatus) => {
    if (onStatusChange) {
      // Update order status
      await onStatusChange(orderId, newStatus);

      // Only send the email if the status is changed to 'ready'
      if (newStatus === 'ready' && userInfo) {
        await sendEmail(userInfo); // Send the email after status change
      }
    }
  };

  // Send the email when the status changes to 'ready'
  const sendEmail = async (userInfo) => {
    // Prepare the email payload
    const emailPayload = {
      from: `"${userInfo.name}" <${userInfo.email}>`,
      subject: `Your Order Is Ready for Pickup | PIZZADAY`,
      text: `Thank you for your order, ${userInfo.name}! Your order is now ready for pickup.`,
      html: OrderReadyTemp({ userInfo}), // Use the OrderReadyTemp to generate the email HTML
    };

    // Send the email request to the backend
    const confirmResponse = await fetch('/api/email/ready', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    });

    // Handle errors if the email was not sent
    if (!confirmResponse.ok) {
      throw new Error('Failed to send confirmation email.');
    }
  };

  // Return the status dropdown
  return (
<Dropdown color="dark" label="Status" size="xs" className="w-auto">
  {statuses.map(
    (status) =>
      status.name !== currentStatus && (
        <Dropdown.Item
          key={status.name}
          onClick={() => handleStatusChange(status.name)}
          className="flex items-center p-2 hover:bg-gray-100 w-full truncate" // Added w-full and truncate for text fitting
        >
          {status.icon}
          <span className="ml-2 truncate w-full">{status.name.charAt(0).toUpperCase() + status.name.slice(1)}</span>
        </Dropdown.Item>
      )
  )}
</Dropdown>

  );
}
