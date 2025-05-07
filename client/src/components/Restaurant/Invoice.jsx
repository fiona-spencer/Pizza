// Invoice.js
import React from 'react';
import { PiInvoice } from "react-icons/pi";

const Invoice = () => {
  return (
    <div className="flex items-center space-x-2">
      <PiInvoice className="w-6 h-6 text-red-600" /> {/* Invoice icon */}
      <span className="text-xl font-semibold text-red-600">Invoice</span> {/* Invoice text */}
    </div>
  );
};

export default Invoice;
