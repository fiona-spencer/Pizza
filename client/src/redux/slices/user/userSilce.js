import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false, // Tracks if the user is logged in
  isAdmin: false,         // Tracks if the user is an admin
  loading: false,
  error: null,
  acceptedCookies: false,
  declinedCookies: false,
  prevPendingCount: 0, // <-- Add this
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true; // User is logged in
      state.isAdmin = action.payload.isAdmin || false; // Set if the user is an admin
      state.loading = false;
    },
    // Set user as authenticated and mark if they are an admin
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true; // User is authenticated
      state.isAdmin = action.payload.isAdmin || false; // Mark as admin if applicable
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false; // Mark as not authenticated on logout
      state.isAdmin = false;         // Mark as not an admin on logout
    },
    updateUser: (state, action) => {
      if (state.currentUser) {
        const updatedUser = { ...state.currentUser, ...action.payload };
        if (state.currentUser._id) {
          updatedUser._id = state.currentUser._id;
        }
        state.currentUser = updatedUser;
      }
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true; // Mark the user as authenticated
      state.isAdmin = action.payload.isAdmin || false; // Mark as admin if applicable
    },
    acceptCookies: (state) => {
      state.acceptedCookies = true;
      localStorage.setItem("acceptedCookies", "true"); // Changed to localStorage
    },
    declineCookies: (state) => {
      state.acceptedCookies = false;
      localStorage.removeItem("acceptedCookies"); // Removed from localStorage if declined
    },
    setPrevPendingCount: (state, action) => {
      state.prevPendingCount = action.payload;
    },
  },
});

export const { 
  createUser, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  setUser, 
  acceptCookies, 
  declineCookies, 
  setPrevPendingCount
} = userSlice.actions;

export default userSlice.reducer;
