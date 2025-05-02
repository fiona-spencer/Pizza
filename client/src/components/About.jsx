import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ServiceCard from "./ServiceCard";
import aboutImage from "../assets/favicon.svg";

const About = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
  });

  return (
    <>
      {/* Image with animation on scroll */}
      <motion.div
        className="flex justify-center sm:pt-10 -mt-4"
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <img
          src={aboutImage}
          alt="About Us"
          className="max-h-40 mb-2 w-40 sm:max-h-64 sm:w-64 border-white shadow-xl bg-[#fbfbfbe3] rounded-full"
        />
      </motion.div>

      {/* About Header */}
      <motion.div variants={textVariant()}>
        
        <h2 className={`${styles.sectionHeadText} mt-2 text-center sm:text-left`}>About</h2>
      </motion.div>

      {/* About Text */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className=" text-[#190d0d] text-base sm:text-lg max-w-4xl leading-relaxed font-semibold mx-auto sm:mx-0 pb-4"
      >
        We started our journey with a passion for pizza—discover more about our story below

      </motion.p>

      {/* Cards Section */}
      {isMobile ? (
        <div ref={sliderRef} className="keen-slider mt-3">
          {services.map((service, index) => (
            <div key={service.title} className="keen-slider__slide flex justify-center">
              <ServiceCard {...service} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default SectionWrapper(About, "about");
