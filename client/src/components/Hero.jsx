import { motion } from "framer-motion";
import arrowImage from "../assets/arrowImage.png";
import heroBg from "../assets/hero-pizza.webp";
import { IoPizzaOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";


const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center px-4">
        <div className="bg-[#e3dbdb97] p-6 border-4 text-white max-w-xl h-96">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hooray for Pizza Day</h1>
          <p className="text-lg sm:text-xl mb-4 sm:p-6">
            The freshest ingredients. The boldest flavors. Delivered hot to your door.
          </p>
          {/* Buttons */}
          <div className="w-full flex justify-center">
  <div className="flex flex-col sm:flex-row gap-4">
    <a
      href="#pickup"
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 sm:text-xl rounded-md transition duration-300 flex items-center justify-center"
    >
      Order for Pickup
      <IoPizzaOutline className="ml-3 w-7 h-7 sm:w-10 sm:h-10" />
    </a>
    <a
      href="#delivery"
      className="bg-white hover:bg-gray-200 text-red-600 font-semibold py-3 px-6 sm:py-4 sm:px-8 sm:text-xl rounded-md transition duration-300 flex items-center justify-center"
    >
      Order to Go
      <TbTruckDelivery className="ml-3 w-7 h-7 sm:w-10 sm:h-10" />
    </a>
  </div>
</div>


        </div>
      </div>

      {/* Animated Arrow */}
      <a href="#about" className="absolute bottom-10 flex flex-col items-center z-0">
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
      className="w-[50px] sm:w-[60px] md:w-[70px] object-contain"
    />
  </motion.div>
</a>

    </section>
  );
};

export default Hero;
