import React, { useRef, useState, useEffect } from 'react';
import { jsPDF } from "jspdf";  // Import jsPDF for generating the PDF
import html2canvas from 'html2canvas';  // Import html2canvas for rendering the div as an image
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';




// Color mapping for order statuses
const statusColors = {
  'pending': 'text-yellow-500',
  'in-progress': 'text-blue-500',
  'ready': 'text-green-500',
  'canceled': 'text-red-500',
  'finished': 'text-gray-500',
};

const InvoiceContent = React.forwardRef(({ summaryData }, ref) => (
<div ref={ref} className="p-8 bg-white text-black max-w-2xl mx-auto shadow-lg rounded-md">
  <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Pizza Day Invoice Summary</h1>
  <p className="text-lg text-gray-600">Date: {new Date().toLocaleDateString()}</p>
  
  <div className="mt-6">
    <h2 className="text-xl font-semibold">Order Status Summary</h2>
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="text-left py-2">Status</th>
          <th className="text-right py-2">Total Orders</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(summaryData.statusCounts).map(([status, count]) => (
          <tr key={status}>
            <td className={`${statusColors[status]}`}>{status}</td>
            <td className="text-right">{count}</td>
          </tr>
        ))}
        
        {/* Add space (empty row) between "Finished" and "Total Orders" */}
        <tr>
          <td colSpan="2" className="py-2"></td>
        </tr>

        <tr className="font-bold border-t-4">
          <td>Total Orders</td>
          <td className="text-right">{summaryData.totalOrders}</td>
        </tr>
        <tr className="font-bold">
          <td>Total Earned</td>
          <td className="text-right">${summaryData.totalEarned.toFixed(2)}</td>
        </tr>
        <tr className="font-bold">
          <td>Total Tips</td>
          <td className="text-right">${summaryData.totalTips.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

));

export default function Invoice() {
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin } = useSelector((state) => state.user); // ✅ Redux auth state

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/signin'); // Redirect if not authenticated or not admin
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const componentRef = useRef();
  const [summaryData, setSummaryData] = useState({
    totalEarned: 0,
    totalTips: 0,
    totalOrders: 0,
    statusCounts: {
      'pending': 0,
      'in-progress': 0,
      'ready': 0,
      'canceled': 0,
      'finished': 0,
    }
  });

  const generatePDF = () => {
    html2canvas(componentRef.current, {
      useCORS: true, // Ensure to allow external images (if any)
      scrollX: 0,
      scrollY: -window.scrollY, // Prevents weird offset
    }).then((canvas) => {
      const doc = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      const pageHeight = doc.internal.pageSize.height;

      doc.addImage(imgData, 'PNG', 10, 10, 190, (canvas.height * 190) / canvas.width);

      // Save the document
      doc.save("Pizza_Invoice_Summary.pdf");
    });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/order/getOrders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();

        let totalEarned = 0;
        let totalTips = 0;
        let totalOrders = 0;
        const statusCounts = {
          'pending': 0,
          'in-progress': 0,
          'ready': 0,
          'canceled': 0,
          'finished': 0,
        };

        // Process each order
        data.forEach(order => {
          totalOrders += 1;
          totalEarned += order.totalWithTax;
          totalTips += order.tip;

          // Count orders by status
          if (order.status in statusCounts) {
            statusCounts[order.status] += 1;
          }
        });

        setSummaryData({
          totalEarned,
          totalTips,
          totalOrders,
          statusCounts
        });
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">

            {/* ✅ Back Button */}
      <div className="absolute top-4 right-4 z-10">
        <Link to="/restaurant" className="text-red-600 hover:text-red-800">
          <RiArrowGoBackLine size={30} className="hover:text-white hover:bg-red-200 hover:p-1 rounded-md" />
        </Link>
      </div>
      <div className="text-center mb-4">
        <button
          onClick={generatePDF}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Download PDF
        </button>
      </div>
      <InvoiceContent ref={componentRef} summaryData={summaryData} />
    </div>
  );
}
