import { motion } from "framer-motion";
import arrowImage from "../../src/assets/arrowImage.png"; // Ensure the correct import path

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      {/* Hero Background Image */}
      <img
        src="src/assets/hero-background.avif"
        alt="Hero background"
        className="w-full h-full object-cover absolute top-0 left-0 z-[-1]" // Ensure it covers the container and is positioned behind other elements
      />

      <div className="relative w-full h-full flex flex-col justify-center items-center">
        {/* Hero Pizza Image */}
        <img
          src="src/assets/hero-pizza.webp"
          alt="Hero picture"
          className="w-auto h-auto mb-10" // Adjust size and margin as needed
        />

        {/* Animated Arrow */}
        <a href="#about" className="flex flex-col items-center">
          <div className="w-[35px] h-[64px] flex justify-center items-start relative">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute"
            >
              <img
                src={arrowImage}
                alt="Arrow"
                className="object-contain"
                style={{ width: "100px", height: "auto" }}
              />
            </motion.div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;