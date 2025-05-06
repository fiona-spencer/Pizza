// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // For localStorage

import userReducer from '../slices/user/userSilce';
import orderReducer from '../slices/order/orderSlice';
import cartReducer from '../slices/cart/cartSlice'; // <-- ✅ Import your cart slice

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'], // <-- ✅ Persist cart and user
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  cart: cartReducer, // <-- ✅ Add cart to rootReducer
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
