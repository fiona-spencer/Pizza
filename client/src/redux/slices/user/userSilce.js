// src/slices/user/userSilce.js
import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for user
const initialState = {
  currentUser: null,   // Store the user data here
  isAuthenticated: false, 
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;  // Store the user info
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

// Export actions
export const { loginSuccess, loginFailure, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
