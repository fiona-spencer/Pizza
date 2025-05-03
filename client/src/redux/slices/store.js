import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This is for localStorage
import customerReducer from './customer/customerSlice'
import orderReducer from './order/orderSlice';

// Combine only the customer and order reducers
const rootReducer = combineReducers({
  order: orderReducer, // Order state
  customer: customerReducer, // Customer state
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  version: 1, // Version number (helps when changing structure of persisted state)
  blacklist: [], // You can blacklist reducers from being persisted
  whitelist: ['order', 'customer'], // Whitelist order and customer to persist them
};

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore persist actions for serializable check
      },
    }),
});

// Create the persistor to manage persistence
export const persistor = persistStore(store);

// Export the store
export { store };
