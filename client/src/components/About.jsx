import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ServiceCard from "./ServiceCard";

// Add your image source here
import aboutImage from '../../public/assets/favicon.svg';

const About = () => {
  return (
    <>

      {/* Image with animation on scroll */}
      <motion.div
        className="flex justify-center"
        whileInView={{ opacity: 1, scale: 1 }} // Animation when in view
        initial={{ opacity: 0, scale: 0.8 }} // Initial state when not in view
        transition={{ duration: 1, ease: "easeInOut" }} // Transition settings
        viewport={{ once: true, amount: 0.5 }} // Start the animation when 50% of the element is in view
      >
        <img
          src={aboutImage} // Your image source here
          alt="About Us"
          className="max-h-56 w-56 border-white shadow-xl bg-[#fbfbfbe3] rounded-full"
          />
      </motion.div>

      {/* About Header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} mt-10 text-center sm:text-left`}>get to know us</p>
        <h2 className={`${styles.sectionHeadText} text-center sm:text-left`}>About</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-black text-base sm:text-lg max-w-4xl leading-relaxed mx-auto sm:mx-0"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua...
      </motion.p>

    

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
