// pages/InvoicePage.jsx
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const InvoiceContent = React.forwardRef((props, ref) => (
  <div ref={ref} className="p-8 bg-white text-black max-w-2xl mx-auto shadow-lg">
    <h1 className="text-3xl font-bold mb-4 text-center">Pizza Day Invoice</h1>
    <p>Date: {new Date().toLocaleDateString()}</p>
    
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td>Large Pepperoni Pizza</td>
            <td className="text-right">$15.00</td>
          </tr>
          <tr className="border-b">
            <td>2x Soft Drink</td>
            <td className="text-right">$4.00</td>
          </tr>
          <tr className="font-bold">
            <td>Total</td>
            <td className="text-right">$19.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mt-8 text-center text-sm text-gray-500">
      Thank you for your order! 🍕
    </div>
  </div>
));

export default function Invoice() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Pizza_Invoice',
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="text-center mb-4">
        <button
          onClick={handlePrint}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Download PDF
        </button>
      </div>
      <InvoiceContent ref={componentRef} />
    </div>
  );
}
