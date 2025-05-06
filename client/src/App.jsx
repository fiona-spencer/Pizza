import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary routing components
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage';
import PaymentInfo from '../src/stripe/PaymentInfo';
import Completion from '../src/stripe/Completion';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/paymentInfo" element={<PaymentInfo />} /> */}
        <Route path="/completion" element={<Completion />} />
      </Routes>
    </>
  );
};

export default App;
