import { BrowserRouter } from "react-router-dom";

import {
  Navbar,
  About,
  Contact,
  Feedback,
  Menu,
  Hero,
  StarsCanvas,
  Footer,
} from "./components";

const App = () => {
  return (
    <>
    <div className=" bg-red-300">
      {/* Navbar and Hero Section */}
      <div className="bg-white bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>

  
          <About />

      {/* Menu Section */}
      <div className="bg-red-500">
        <Menu />
      </div>

      {/* Feedback, Contact, and Canvas Section */}
          {/* About Section */}
      <div className="relative z-0">
        <Feedback />
        <Contact />
        <StarsCanvas />
      </div>

      {/* Footer */}
      <Footer />
    </div>
    </>

  );
};

export default App;
