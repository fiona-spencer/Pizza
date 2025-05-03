import React from 'react';
import Hero from './Hero';
import Navbar from './Navbar';
import About from './About';
import Menu from './Menu';
import Wings from './Wings';
import Sides from './Sides';
import Feedback from './Feedback';
import Map from './Map';
import InstaPage from './InstaPage';
import Contact from './Contact';
import Footer from './Footer';
import StarsCanvas from './canvas/Stars';

import aboutBg from '../assets/aboutbg.jpg'

const HomePage = () => {
  return (
    <div className="bg-red-300">
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
      </div>
      <Wings />
      <Sides />

      {/* Feedback, Contact, and Canvas Section */}
      <div className="z-0 relative bg-[#272524ed]">
        <Feedback />
        <InstaPage />
        <div className="bg-[#da5a5a] relative z-0">
          <Map />
          <Contact />
          <StarsCanvas />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
