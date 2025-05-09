import React, { useState, useEffect, useRef } from 'react';
import { RiArrowGoBackLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { IoArchiveSharp } from "react-icons/io5";

const InvoiceContent = React.forwardRef(({ summaryData }, ref) => {
  const [isAscending, setIsAscending] = useState(true);  // State to track sorting order

  // Function to format date (e.g., '2025-05-09')
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const archiveAllOrders = async () => {
    try {
      const response = await fetch('/api/order/archiveAllOrders', {
        method: 'PUT',
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(`✅ ${result.updatedCount} orders archived.`);
        // Optionally refetch data here to refresh UI
      } else {
        alert(`⚠️ Failed to archive: ${result.message}`);
      }
    } catch (error) {
      alert('❌ Error archiving orders.');
      console.error(error);
    }
  };
  

  // Toggle sorting order (ascending or descending)
  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  // Sort the dates based on the current sort order
  const sortedDates = Object.keys(summaryData.ordersByDate).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return isAscending ? dateA - dateB : dateB - dateA;  // Sort ascending or descending
  });

  return (
    <div ref={ref} className="p-6 bg-white text-black max-w-4xl mx-auto shadow-lg rounded-md">
      <div className="text-center mb-4 space-x-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Pizza Day Summary</h1>
<div className="absolute top-4 text-sm bg-yellow-500 border-yellow-600 border-4 font-bold text-white px-6 py-2 flex rounded-full hover:bg-yellow-600 items-center justify-center">  
<button
    onClick={archiveAllOrders}
    className="flex"
  >
    Archive 

    <IoArchiveSharp className='mt-0.5 ml-2' />
  </button>
</div>
</div>
      {/* Grand Total */}
      <div className="text-center mt-4 mb-6">
        <h2 className="text-2xl font-bold text-red-600">Grand Total: ${summaryData.totalEarned.toFixed(2)}</h2>
        <p className="text-lg text-gray-600">Total Finished Orders: {summaryData.totalOrders}</p>
      </div>
        {/* <h2 className="text-xl font-semibold mb-4 justify-center">Finished Orders (By Date)</h2> */}

      {/* Toggle Sort Button with Up/Down Arrow */}


      {/* Orders Grouped by Date */}
      <div className="mt-6">
        <div className="flex justify-start mb-6">
        <button
          onClick={toggleSortOrder}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-right justify-start space-x-2"
        >
          <span className="text-sm font-semibold">{isAscending ? "Sort by Oldest" : "Sort by Newest"}</span>
          <span>
            {isAscending ? (
              <FaArrowAltCircleDown size={20} />
            ) : (
              <FaArrowAltCircleUp size={20} />
            )}
          </span>
        </button>
      </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total Order Price</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total Tips</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total Orders</th>
              </tr>
            </thead>
            <tbody>
              {sortedDates.map((dateKey) => {
                const orders = summaryData.ordersByDate[dateKey];
                let totalOrderPrice = 0;
                let totalTips = 0;
                let totalFinishedOrders = 0;

                // Calculate total for the day's orders
                orders.forEach(order => {
                  totalOrderPrice += order.totalWithTax;
                  totalTips += order.tip;
                  totalFinishedOrders += 1;  // Only count finished orders
                });

                return (
                  <tr key={dateKey} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{formatDate(dateKey)}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${totalOrderPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">${totalTips.toFixed(2)}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{totalFinishedOrders}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default function Invoice() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/signin');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const componentRef = useRef();
  const [summaryData, setSummaryData] = useState({
    totalEarned: 0,
    totalTips: 0,
    totalOrders: 0,
    ordersByDate: {}, // Grouped by createdAt date
  });

  const generatePDF = () => {
    html2canvas(componentRef.current, {
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const doc = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10, 190, (canvas.height * 190) / canvas.width);
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
        const ordersByDate = {};
  
        data.forEach(order => {
          if (order.status === 'finished') {
            totalOrders += 1;
            totalEarned += order.totalWithTax;
            totalTips += order.tip;
  
            // Extract date (YYYY-MM-DD) from createdAt (ignoring time part)
            const orderDate = new Date(order.createdAt).toISOString().split('T')[0]; // Get the date part from createdAt
            
            // Group orders by the createdAt date
            if (!ordersByDate[orderDate]) {
              ordersByDate[orderDate] = [];
            }
            ordersByDate[orderDate].push(order);
          }
        });
  
        setSummaryData({
          totalEarned,
          totalTips,
          totalOrders,
          ordersByDate,
        });
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
  
    fetchOrders();
  }, []);

 

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="absolute top-4 right-4 z-10">
        <Link to="/restaurant" className="text-red-600 hover:text-red-800">
          <RiArrowGoBackLine size={30} className="hover:text-white hover:bg-red-200 hover:p-1 rounded-md" />
        </Link>
      </div>



      <div className="text-center mb-4">
        <button
          onClick={generatePDF}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Download PDF
        </button>
      </div>

      <InvoiceContent ref={componentRef} summaryData={summaryData} />
    </div>
  );
}
