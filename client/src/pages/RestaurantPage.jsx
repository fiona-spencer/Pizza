import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Keep default styles from react-tabs

import ActiveOrders from '../components/Restaurant/ActiveOrders';
import CompletedOrders from '../components/Restaurant/CompletedOrders';
import Invoice from '../components/Restaurant/Invoice';

export default function RestaurantPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Invoice Component positioned at top left */}
      <div className="flex items-center mb-8 justify-end">
        <Invoice /> {/* This renders the Invoice component */}
      </div>

      <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">Restaurant Orders</h1>

      <Tabs className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <TabList className="flex justify-center space-x-4 bg-red-500 text-white pt-2 rounded-t-lg">
          <Tab className="px-6 py-2 cursor-pointer hover:bg-red-600 rounded-t-lg transition-all">Orders</Tab>
          <Tab className="px-6 py-2 cursor-pointer hover:bg-red-600 rounded-t-lg transition-all">Completed Orders</Tab>
        </TabList>

        <TabPanel className="p-6">
          <ActiveOrders /> {/* Render ActiveOrders component here */}
        </TabPanel>

        <TabPanel className="p-6">
          <CompletedOrders /> {/* Render CompletedOrders component here */}
        </TabPanel>
      </Tabs>
    </div>
  );
}
