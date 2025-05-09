import { useState } from "react";
import { motion } from "framer-motion";
import { IoPizzaOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import arrowImage from "../../assets/arrowImage.png";
import heroBg from "../../assets/hero-pizza.webp";

import pizzaIcon from "../../assets/logo.png"; // replace with your own image path

const Hero = () => {
  const [modalType, setModalType] = useState(null); // "pickup" | "delivery" | null
  const closeModal = () => setModalType(null);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center px-4">
        <div className="bg-[#e3dbdbb6] p-8 border-4 border-white text-white max-w-xl d shadow-lg flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Hooray for Pizza Day</h1>
          <p className="text-lg sm:text-xl mb-6 px-2 sm:px-6">
            The freshest ingredients. The boldest flavors. Delivered hot to your door or visit us for pickup.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setModalType("pickup")}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 sm:text-lg rounded-md transition duration-300 flex items-center justify-center"
            >
              Order for Pickup
              <IoPizzaOutline className="ml-3 w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={() => setModalType("delivery")}
              className="bg-white hover:bg-gray-200 text-red-600 font-semibold py-3 px-6 sm:py-4 sm:px-8 sm:text-lg rounded-md transition duration-300 flex items-center justify-center"
            >
              Order to Go
              <TbTruckDelivery className="ml-3 w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Arrow Animation */}
      <a href="#about" className="absolute bottom-10 flex flex-col items-center z-10">
        <motion.div
          animate={{ y: [0, 24, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <img
            src={arrowImage}
            alt="Scroll down arrow"
            className="w-[50px] sm:w-[60px] md:w-[70px] object-contain"
          />
        </motion.div>
      </a>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-xl">
            {modalType === "pickup" ? (
              <>
                <h2 className="text-2xl font-semibold text-red-600 mb-4">FOR PICKUP</h2>
                <p className="mb-4 text-gray-700">
                  We recommend placing your pickup orders directly on our site, or use:
                </p>
                <div className="flex flex-col gap-3 mb-4">
                  <a
                    href="/order" // Replace with your actual route
                    className="flex items-center justify-center bg-red-100 border-2 border-red-500 shadow-lg hover:bg-red-300 hover:shadow-2xl text-white px-5 py-2 rounded transition"
                  >
                    <img src={pizzaIcon} alt="Pizza" className="w-44 h-auto mr-2 pt-2" />
                  </a>
                  <div className="flex justify-center gap-3">
                    <a
                      href="https://www.ubereats.com/ca/store/hooray-for-pizza-day/Gw28btzTVMy_OMN-PcZBPg?srsltid=AfmBOooH-wW8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 shadow-lg text-white px-4 py-2 rounded"
                    >
                      Uber Eats
                    </a>
                    <a
                      href="https://www.doordash.com/store/hooray-for-pizza-day-toronto-27973800/37986546/?utm_campaign=gpa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-500 hover:bg-red-600 shadow-lg text-white px-4 py-2 rounded"
                    >
                      DoorDash
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-red-600 mb-4">FOR DELIVERY</h2>
                <p className="mb-4 text-gray-700">
                  Sorry, we do not offer delivery directly. Please order through:
                </p>
                <div className="flex justify-center gap-4 mb-4">
                  <a
                    href="https://www.ubereats.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Uber Eats
                  </a>
                  <a
                    href="https://www.doordash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    DoorDash
                  </a>
                </div>
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-2 text-sm text-gray-600 underline hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

