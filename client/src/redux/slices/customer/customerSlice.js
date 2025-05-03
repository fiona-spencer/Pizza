import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCustomer: null,
  error: null,
  loading: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentCustomer = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentCustomer = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCustomerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCustomerSuccess: (state) => {
      state.currentCustomer = null;
      state.loading = false;
      state.error = null;
    },
    deleteCustomerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentCustomer = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deleteCustomerStart,
  deleteCustomerSuccess,
  deleteCustomerFailure,
  signoutSuccess,
} = customerSlice.actions;

export default customerSlice.reducer;
