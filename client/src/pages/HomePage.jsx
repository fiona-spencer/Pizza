import React from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Pizza from '../components/Pizza';
import Wings from '../components/Modal/Wings';
import Sides from '../components/Sides';
import Feedback from '../components/Feedback';
import Map from '../components/Map';
import InstaPage from '../components/InstaPage';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import StarsCanvas from '../components/canvas/Stars';

import aboutBg from '../assets/aboutbg.jpg'

const HomePage = () => {
  return (
    <div className="bg-red-300 z-0">
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
        <div className="relative">
          <About />
        </div>
      </div>

      {/* Menu Section */}
      <div className="bg-red-500 z-0">
        <Pizza />
      </div>
      <Wings />
      <Sides />

      {/* Feedback, Contact, and Canvas Section */}
      <div className="  bg-[#272524ed]">
        <Feedback />
        <InstaPage />
        <div className="bg-[#da5a5a]">
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
