// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for orders
const initialState = {
  orders: [],        // Array to hold orders
  currentOrder: null, // Current order being created/updated
  loading: false,     // Whether an order operation is in progress
  error: null,        // Any error message
};

const orderSlice = createSlice({
  name: 'order',        // Slice name
  initialState,         // Initial state
  reducers: {
    // Action to start creating an order
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action to handle successful order creation
    createOrderSuccess: (state, action) => {
      state.orders.push(action.payload); // Add new order to the list
      state.currentOrder = action.payload;
      state.loading = false;
    },
    // Action to handle failed order creation
    createOrderFailure: (state, action) => {
      state.error = action.payload; // Store error message
      state.loading = false;
    },
    // Action to get all orders
    getOrdersSuccess: (state, action) => {
      state.orders = action.payload;
    },
    // Action to get an individual order
    getOrderSuccess: (state, action) => {
      state.currentOrder = action.payload;
    },
    // Action to update the status of an order (e.g., delivered)
    updateOrderStatus: (state, action) => {
      const orderIndex = state.orders.findIndex(order => order.id === action.payload.id);
      if (orderIndex !== -1) {
        state.orders[orderIndex].status = action.payload.status;
      }
    },
  },
});

// Export actions
export const { 
  createOrderStart, 
  createOrderSuccess, 
  createOrderFailure,
  getOrdersSuccess, 
  getOrderSuccess, 
  updateOrderStatus 
} = orderSlice.actions;

// Export the reducer to be used in the store
export default orderSlice.reducer;
