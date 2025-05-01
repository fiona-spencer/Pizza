import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Feedback,
  Menu,
  Hero,
  Navbar,
  StarsCanvas,
  PizzaCanvas,
  Footer,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-red-300">
        <div className="bg-white bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <div className="bg-red-500">
          <Menu />
        </div>

        <div className="relative z-0">
          <Feedback />
          <Contact />
          <StarsCanvas />
          <PizzaCanvas />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;