import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary routing components
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage';
import PaymentInfo from '../src/stripe/PaymentInfo';
import Completion from '../src/stripe/Completion';
import RestaurantPage from './pages/RestaurantPage';
import Signin from './components/Restaurant/Signin';
import Invoice from './components/Restaurant/Invoice';
import Availability from './components/Restaurant/Availability';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/paymentInfo" element={<PaymentInfo />} /> */}
        <Route path="/completion" element={<Completion />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/menu" element={<Availability />} />
      </Routes>
    </>
  );
};

export default App;
