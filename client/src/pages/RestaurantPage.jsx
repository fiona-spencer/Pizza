import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { PiInvoice } from "react-icons/pi";
import { MdMenuBook } from "react-icons/md";
import 'react-tabs/style/react-tabs.css';

import Invoice from '../components/Restaurant/Invoice';
import PendingOrders from '../components/Restaurant/PendingOrders';
import InProgressOrders from '../components/Restaurant/InProgressOrders';
import ReadyOrders from '../components/Restaurant/ReadyOrders';
import CanceledOrders from '../components/Restaurant/CanceledOrders';
import FinishedOrders from '../components/Restaurant/FinishedOrders';

export default function RestaurantPage() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, isAdmin } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/signin');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-white px-2 sm:px-6 py-4">
      {/* Title */}
      <h1 className="text-2xl sm:text-4xl font-bold text-red-600 mb-6 text-center">
        Restaurant Orders
      </h1>
<div className="flex justify-center mb-6">
  <div className="flex items-center space-x-24">
    <Link to="/invoice" className="flex items-center space-x-2 text-red-600 hover:opacity-50">
      <PiInvoice className="w-10 h-10 sm:w-14 sm:h-14" />
      <span className="text-sm sm:text-base font-semibold text-black ">Invoice</span>
    </Link>
    <Link to="/menu" className="flex items-center space-x-2 hover:opacity-50">
    <div className="bg-red-500 p-3 rounded-full">
    <MdMenuBook className="w-7 h-7 sm:w-10 sm:h-10 text-white  hover:bg-red-400rounded-full cursor-pointer" />

    </div>
      <span className="text-sm sm:text-base font-semibold text-black ">Availability</span>
    </Link>
  </div>
</div>



      

      <Tabs className="w-full max-w-5xl  bg-white rounded-lg shadow ">
      <TabList className="flex justify-start sm:justify-center gap-2 sm:gap-3 bg-red-500 text-white rounded-t-lg px-2 py-2 overflow-x-auto max-w-full">
  <Tab className="min-w-[90px] sm:min-w-[110px] px-3 py-2 text-xs sm:text-sm font-semibold text-center cursor-pointer transition-all focus:outline-none">
    Pending
  </Tab>
  <Tab className="min-w-[90px] sm:min-w-[110px] px-3 py-2 text-xs sm:text-sm font-semibold text-center cursor-pointer transition-all focus:outline-none">
    Progress
  </Tab>
  <Tab className="min-w-[90px] sm:min-w-[110px] px-3 py-2 text-xs sm:text-sm font-semibold text-center cursor-pointer transition-all focus:outline-none">
    Ready
  </Tab>
  <Tab className="min-w-[90px] sm:min-w-[110px] px-3 py-2 text-xs sm:text-sm font-semibold text-center cursor-pointer transition-all focus:outline-none">
    Finished
  </Tab>
  <Tab className="min-w-[90px] sm:min-w-[110px] px-3 py-2 text-xs sm:text-sm font-semibold text-center cursor-pointer transition-all focus:outline-none">
    Canceled
  </Tab>
</TabList>




        {/* Tab Panels */}
        <TabPanel>
          <PendingOrders />
        </TabPanel>
        <TabPanel>
          <InProgressOrders />
        </TabPanel>
        <TabPanel>
          <ReadyOrders />
        </TabPanel>
        <TabPanel>
          <FinishedOrders />
        </TabPanel>
        <TabPanel>
          <CanceledOrders />
        </TabPanel>
      </Tabs>
    </div>
  );
}
