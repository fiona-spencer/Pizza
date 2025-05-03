import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store, persistor } from './redux/slices/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
        <BrowserRouter> {/* Wrap the app in BrowserRouter */}
          <App />
        </BrowserRouter>
    </PersistGate>
  </Provider>
);
