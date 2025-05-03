import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary routing components
import OrderPage from './components/OrderPage'; // Import OrderPage component
import HomePage from './components/HomePage'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/restaurant" element={<OrderPage />} />
      </Routes>
    </>
  );
};

export default App;
