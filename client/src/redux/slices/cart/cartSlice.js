// src/redux/slices/cart/cartSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

// Constant for session expiry (1 hour in milliseconds)
const ONE_HOUR = 60 * 60 * 1000;

// Function to get the initial state, including checking for expired session in localStorage
const getInitialState = () => {
  const now = Date.now();
  const saved = JSON.parse(localStorage.getItem("persist:root"))?.cart;

  if (saved) {
    try {
      const parsedCart = JSON.parse(saved);
      if (now - parsedCart.timestamp > ONE_HOUR) {
        // If cart session expired (older than 1 hour), reset to default state
        return {
          items: [],
          sessionId: nanoid(),
          timestamp: now,
        };
      }
      return parsedCart;
    } catch {
      // In case of JSON parse error, return default state
      return {
        items: [],
        sessionId: nanoid(),
        timestamp: now,
      };
    }
  }

  // Default state if nothing exists in localStorage
  return {
    items: [],
    sessionId: nanoid(),
    timestamp: now,
  };
};

// Initial state setup
const initialState = getInitialState();

// Cart slice with actions for adding, updating, and removing items
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addCartItem: (state, action) => {
      const item = action.payload;

      // Ensure state.items is an array, even if localStorage has an error
      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      // Check if the item already exists in the cart (based on name, addOns, and notes)
      const existingItem = state.items.find(
        i =>
          i.name === item.name &&
          JSON.stringify(i.addOns) === JSON.stringify(item.addOns) &&
          i.notes === item.notes &&
          i.restaurantId === item.restaurantId
      );

      // If item exists, update its quantity
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        // Otherwise, add a new item to the cart
        state.items.push(item);
      }

      // Update the timestamp when cart items change
      state.timestamp = Date.now();
    },

    // Action to update an existing cart item
    updateCartItem: (state, action) => {
      const { index, updates } = action.payload;
      if (state.items[index]) {
        // Apply updates to the specified item in the cart
        state.items[index] = { ...state.items[index], ...updates };
        // Update the timestamp after modifying the cart
        state.timestamp = Date.now();
      }
    },

    // Action to delete a cart item
    deleteCartItem: (state, action) => {
      const index = action.payload;
      if (state.items[index]) {
        // Remove the item from the cart
        state.items.splice(index, 1);
        // Update the timestamp after modifying the cart
        state.timestamp = Date.now();
      }
    },

    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = []; // Reset the items to an empty array
      state.timestamp = Date.now(); // Update the timestamp after clearing the cart
    },
  },
});

// Exporting actions to be used in components
export const {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = cartSlice.actions;

// Default export the reducer to be used in the store
export default cartSlice.reducer;
