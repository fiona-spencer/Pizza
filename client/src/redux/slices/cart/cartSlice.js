// src/redux/slices/cart/cartSlice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

// Constant for session expiry (1 hour in milliseconds)
const ONE_HOUR = 60 * 60 * 1000;

// Function to get the initial state, including checking for expired session in localStorage
const getInitialState = () => {
  const now = Date.now();
  const saved = JSON.parse(localStorage.getItem("persist:root"))?.cart;

  const defaultState = {
    items: [],
    sessionId: nanoid(),
    timestamp: now,
    subtotal: 0,
    tip: 0,
    tax: 0,
    totalWithTax: 0,
  };

  if (saved) {
    try {
      const parsedCart = JSON.parse(saved);
      if (now - parsedCart.timestamp > ONE_HOUR) {
        return defaultState;
      }
      return {
        ...parsedCart,
        subtotal: parsedCart.subtotal || 0,
        tip: parsedCart.tip || 0,
        tax: parsedCart.tax || 0,
        totalWithTax: parsedCart.totalWithTax || 0,
      };
    } catch {
      return defaultState;
    }
  }

  return defaultState;
};

// Initial state setup
const initialState = getInitialState();

// Cart slice with actions for adding, updating, and removing items
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const item = action.payload;

      if (!Array.isArray(state.items)) {
        state.items = [];
      }

      const existingItem = state.items.find(
        i =>
          i.name === item.name &&
          JSON.stringify(i.addOns) === JSON.stringify(item.addOns) &&
          i.notes === item.notes &&
          i.restaurantId === item.restaurantId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      state.timestamp = Date.now();
    },

    updateCartItem: (state, action) => {
      const { index, updates } = action.payload;
      if (state.items[index]) {
        state.items[index] = { ...state.items[index], ...updates };
        state.timestamp = Date.now();
      }
    },

    deleteCartItem: (state, action) => {
      const index = action.payload;
      if (state.items[index]) {
        state.items.splice(index, 1);
        state.timestamp = Date.now();
      }
    },

    updateCartItemQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (state.items[index]) {
        state.items[index].quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tip = 0;
      state.tax = 0;
      state.totalWithTax = 0;
      state.timestamp = Date.now();
    },

    // ✅ Updated to handle full cart summary
    setCartSummary: (state, action) => {
      const { subtotal, tip, tax, totalWithTax } = action.payload;
      state.subtotal = subtotal;
      state.tip = tip;
      state.tax = tax;
      state.totalWithTax = totalWithTax;
    },
  },
});

// Export actions
export const {
  addCartItem,
  updateCartItem,
  deleteCartItem,
  clearCart,
  updateCartItemQuantity,
  setCartSummary,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
