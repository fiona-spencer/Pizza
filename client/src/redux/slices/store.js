// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // This is for localStorage
import userReducer from '../slices/user/userSilce'; // Import the user slice
import orderReducer from '../slices/order/orderSlice'; // Import the order slice

// Define persist config
const persistConfig = {
  key: 'root',  // The key to store the persisted state in localStorage
  storage,      // Use localStorage as the storage method
  whitelist: ['user'],  // Only persist the user slice (you can add other slices here if needed)
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,    // Add the user slice to the rootReducer
  order: orderReducer,  // Add the order slice to the rootReducer
});

// Persist the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,  // Use the persisted reducer for the store
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

// Create a persistor to persist the store
const persistor = persistStore(store);

export { store, persistor };
