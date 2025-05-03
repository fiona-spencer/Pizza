import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.push(action.payload); // Add the newly created order to the orders array
      state.error = null;
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateOrderSuccess: (state, action) => {
      state.loading = false;
      const updatedOrder = action.payload;
      const index = state.orders.findIndex((order) => order._id === updatedOrder._id);
      if (index >= 0) {
        state.orders[index] = updatedOrder; // Update the order in the array
      }
      state.error = null;
    },
    updateOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = state.orders.filter((order) => order._id !== action.payload); // Remove the deleted order
      state.error = null;
    },
    deleteOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload; // Set the current order
    },
  },
});

export const {
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  setCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
