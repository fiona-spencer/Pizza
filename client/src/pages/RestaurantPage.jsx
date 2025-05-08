import React, { useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { PiInvoice } from "react-icons/pi";
import { MdMenuBook } from "react-icons/md";

import 'react-tabs/style/react-tabs.css'; // Keep default styles from react-tabs
import Invoice from '../components/Restaurant/Invoice';
import PendingOrders from '../components/Restaurant/PendingOrders';
import InProgressOrders from '../components/Restaurant/InProgressOrders';
import ReadyOrders from '../components/Restaurant/ReadyOrders';
import CanceledOrders from '../components/Restaurant/CanceledOrders';
import FinishedOrders from '../components/Restaurant/FinishedOrders';

export default function RestaurantPage() {
  const navigate = useNavigate(); // Hook to handle navigation
  const { currentUser, isAuthenticated, isAdmin } = useSelector((state) => state.user); // Access Redux state

  useEffect(() => {
    // If the user is not authenticated or not an admin, redirect to the signin page
    if (!isAuthenticated || !isAdmin) {
      navigate('/signin'); // Redirect to signin page if not authenticated or not an admin
    }
  }, [isAuthenticated, isAdmin, navigate]); // Dependencies to watch for updates

  // If the user is not authenticated or not an admin, return null and don’t render the component
  if (!isAuthenticated || !isAdmin) {
    return null; // No component rendering during redirect
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div>
        {/* Your protected admin content here */}
        <h1>Welcome Admin! You have access to this page.</h1>
      </div>
      
      {/* Invoice Component positioned at top left */}
      <div className="flex items-center mb-8 justify-end">
  <Link to="/invoice">
  <div className="flex items-center space-x-2">
      <PiInvoice className="w-6 h-6 text-red-600" /> {/* Invoice icon */}
      <span className="text-xl font-semibold text-red-600">Invoice</span> {/* Invoice text */}
    </div>
  </Link>
</div>

      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">Restaurant Orders</h1>

      

      <Tabs className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">

        
        <TabList className="flex md:justify-center md:space-x-4 bg-red-500 text-white pt-2 rounded-t-lg overflow-x-auto whitespace-nowrap space-x-2 bg-red-500 text-white pt-2 px-2 rounded-t-lg scrollbar-thin scrollbar-thumb-red-300">
          
        <Tab className="px-4 py-2 min-w-[100px] text-xs md:text-base text-center cursor-pointer rounded-t-lg transition-all md:px-6 md:py-2">Pending</Tab>
  <Tab className="px-4 py-2 min-w-[100px] text-xs md:text-base text-center cursor-pointer rounded-t-lg transition-all md:px-6 md:py-2">In Progress</Tab>
  <Tab className="px-4 py-2 min-w-[100px]  text-xs md:text-base text-center cursor-pointer rounded-t-lg transition-all md:px-6 md:py-2">Ready</Tab>
  <Tab className="px-4 py-2 min-w-[100px] text-xs md:text-base text-center cursor-pointer rounded-t-lg transition-all md:px-6 md:py-2">Finished</Tab>
  <Tab className="px-4 py-2 min-w-[100px]  text-xs md:text-base text-center cursor-pointer rounded-t-lg transition-all md:px-6 md:py-2">Canceled</Tab>
          <div className="  flex items-center space-x-4">
    <Link to="/menu">
      <MdMenuBook className="w-8 h-8 ml-14 mb-2 text-red-600 hover:bg-red-300 cursor-pointer bg-white p-1 rounded-full" />
    </Link>
  </div>
        </TabList>

        <TabPanel className="">
          <PendingOrders /> {/* Render PendingOrders component here */}
        </TabPanel>

        <TabPanel className="">
          <InProgressOrders /> {/* Render InProgressOrders component here */}
        </TabPanel>

        <TabPanel className="">
          <ReadyOrders /> {/* Render ReadyOrders component here */}
        </TabPanel>
        
        <TabPanel className="">
          <FinishedOrders /> {/* Render FinishedOrders component here */}
        </TabPanel>

        <TabPanel className="">
          <CanceledOrders /> {/* Render CanceledOrders component here */}
        </TabPanel>



      </Tabs>
    </div>
  );
}
