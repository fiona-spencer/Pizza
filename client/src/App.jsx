import { BrowserRouter } from "react-router-dom";

import {
  Navbar,
  About,
  Contact,
  Feedback,
  Menu,
  Wings,
  Sides,
  Map,
  InstaPage,
  Hero,
  StarsCanvas,
  Footer,
} from "./components";

import aboutBg from '../src/assets/aboutbg.jpg'

const App = () => {
  return (
    <>
    <div className=" bg-red-300">
      {/* Navbar and Hero Section */}
      <div className="bg-white bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>


        {/* About Section with Background Image */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${aboutBg})`,
              opacity: 0.3, // Adjust this value to control the opacity of the background image
              filter: 'blur(1px)', // Adjust the blur effect (8px is an example)
            }}
          />
          <div className="relative z-10">
            <About />
          </div>
        </div>


      {/* Menu Section */}
      <div className="bg-red-500">
        <Menu />
      <Wings/>
      <Sides/>
      </div>

      {/* Feedback, Contact, and Canvas Section */}
          {/* About Section */}
      <div className="z-0 relative bg-[#272524ed]">
        <Feedback />
        <div className="bg-[#da5a5a] relative z-0">
<InstaPage/>
<Map/>
        <Contact />
        <StarsCanvas />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    </>

  );
};

export default App;
