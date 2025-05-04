import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCustomer: null,
  cart: [], // Add a cart array to store items added to the cart
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
      state.cart = []; // Clear the cart when the user signs out
      state.error = null;
      state.loading = false;
    },

    // ** Add to Cart Actions **

    // Action to add an item to the cart
    addToCart: (state, action) => {
      state.cart.push(action.payload); // Add the item to the cart
    },
    
    // Action to remove an item from the cart
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id); // Remove item by id
    },

    // Action to clear the cart
    clearCart: (state) => {
      state.cart = []; // Clear the cart array
    },

    // Action for cart-related loading (if needed, for example when adding/removing items)
    cartLoadingStart: (state) => {
      state.loading = true;
    },

    cartLoadingEnd: (state) => {
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
  addToCart,
  removeFromCart,
  clearCart,
  cartLoadingStart,
  cartLoadingEnd,
} = customerSlice.actions;

export default customerSlice.reducer;
