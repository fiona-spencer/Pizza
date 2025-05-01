import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants"; // Assuming services no longer include tech/company icons
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title }) => (
  <Tilt
    options={{
      max: 45,
      scale: 1.05, // Slightly larger tilt effect
      speed: 450,
    }}
    className="w-full md:w-[400px] lg:w-[3000px] p-4" // Adjust width and padding
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full border border-gray-300 squared-lg shadow-lg"
    >
      <div className="bg-white squared-lg p-6 flex flex-col items-center max-h-[250px]">
        {/* Ensure the title is not empty */}
        <h1 className="text-black text-lg md:text-xl font-semibold mb-4">
          {title}
        </h1>
        {/* Placeholder for any content, can add map or image */}
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>get to know us</p>
        <h2 className={styles.sectionHeadText}>About</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-black text-[17px] max-w-5xl leading-[30px]"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
