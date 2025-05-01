import { motion } from "framer-motion";
import arrowImage from "../assets/arrowImage.png";
import heroBg from "../assets/hero-pizza.webp";

const Hero = () => {
  return (
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center  overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Animated Arrow */}
      <a href="#about" className="flex flex-col items-center mt-4 z-10">
        <motion.div
          animate={{ y: [0, 24, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <img
            src={arrowImage}
            alt="Scroll down arrow"
            className="w-[30px] sm:w-[40px] md:w-[50px] object-contain"
          />
        </motion.div>
      </a>
    </section>
  );
};

export default Hero;
