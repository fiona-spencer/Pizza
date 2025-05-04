// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for user
const initialState = {
  user: null,             // User details (name, email, etc.)
  isAuthenticated: false, // Authentication status
  loading: false,         // Whether an action is in progress
  error: null,            // Any error messages
};

const userSlice = createSlice({
  name: 'user',           // Slice name
  initialState,           // Initial state
  reducers: {
    // Action to start login
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Action to handle login success
    loginSuccess: (state, action) => {
      state.user = action.payload;  // Store user info
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Action to handle login failure
    loginFailure: (state, action) => {
      state.error = action.payload;  // Store error message
      state.loading = false;
    },
    // Action to handle user logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // Action to update user info (e.g., profile)
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, updateUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
