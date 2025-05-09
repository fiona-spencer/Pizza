import { motion, AnimatePresence } from "framer-motion";
import { IoMdAddCircle,IoMdCheckmarkCircle } from "react-icons/io";
import { styles } from "../../styles";
import { fadeIn } from "../../utils/motion";
import { wingsImages } from "../../constants"; // Import the wings data
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { useState, useEffect, useRef } from "react"; // Make sure useEffect is imported
import ItemModal from "./ItemModal"; // Import ItemModal
import { RxValueNone } from "react-icons/rx";


const spicyLevels = ["No spice", "Mild", "Medium", "Hot", "Extra Hot"];


const spicyFade = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const spicyItem = {
hidden: { opacity: 0, y: 10 },
show: { opacity: 1, y: 0 },
};

const Wings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1); // re-triggers animation
    }, 10000); // 5 minutes

    return () => clearInterval(interval);
  }, []);
 
  
  const wing = wingsImages[0]; // Assuming there's only one wing item

  // Create a ref for KeenSlider instance
  const [sliderRef, instanceRef] = useKeenSlider({
    vertical: true,  // Enable vertical sliding
    loop: true,      // Enable looping
    slideChanged(s) {
      // We no longer need to track the current slide explicitly here
    },
    slidesPerView: 3,  // Show 3 slides at a time
    mode: "free",      // Smooth scroll mode
    dragSpeed: 0.5,    // Adjust the drag speed
    spacing: 1,        // Reduced spacing between slides
    peek: { before: 1, after: 1 },  // Allow a peek of the adjacent slides
  });

  const renderPrice = (price) => {
    const parsed = parseFloat(price);
    return isNaN(parsed) ? null : parsed.toFixed(2);
  };
  

  // Auto-scroll function
  const autoScroll = () => {
    if (instanceRef.current) {
      instanceRef.current.next(); // Trigger the next slide
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      autoScroll(); // Change to next slide every 3 seconds
    }, 3000); // Update to 3000ms (3 seconds)

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  const handleOpenModal = () => {
    setSelectedItem({
      ...wing,   // Spread the existing wing item properties
      category: "wing", // Add the category explicitly as 'wing'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  {renderPrice(wing.price) && (
  <h3 className="text-black font-bold text-xl mb-1">
    CA ${renderPrice(wing.price)}
  </h3>

)}


  return (
    <div className="bg-[#323232] p-6 px-8 pb-10 flex flex-col lg:items-center lg:justify-center">
      <motion.div>
        <p className={`${styles.sectionSubText} md:pt-10 text-gray-400`}>flavor explosion</p>
        <h2 className={styles.sectionHeadText}><div className="text-red-600">Wings</div></h2>
      </motion.div>

      <div className="w-full flex flex-col items-center justify-center text-white">
  <motion.p
    variants={fadeIn("", "", 0.1, 1)}
    className="text-[17px] lg:text-xl max-w-5xl pb-4 pt-4 text-white text-center"
  >
    Crispy, juicy wings served with your choice of artisanal sauce. Served with carrots & celery with our homemade ranch or blue cheese dip.
  </motion.p>

  {/* Spicy Level Legend */}
  <AnimatePresence mode="wait z-10">
  <motion.div
    key={animationKey}
    className="flex flex-col items-center text-xs sm:text-sm md:text-base mb-3 border border-red-500 rounded-md p-4 bg-white/5 backdrop-blur w-full overflow-x-auto"
    variants={spicyFade}
    initial="hidden"
    animate="show"
  >
    <p className="font-semibold mb-2 text-white text-center whitespace-nowrap text-lg">Spicy Level</p>
    <div className="flex gap-5 justify-center whitespace-nowrap w-full">
      {spicyLevels.map((label, level) => (
        <motion.div
          key={label}
          className="flex flex-col items-center min-w-fit"
          variants={spicyItem}
        >
          <span className="text-sm sm:text-base text-red-300 leading-normal text-center">
            {level === 0 ? <RxValueNone className="text-[20px] sm:mt-1" /> : "🌶️".repeat(level)}
          </span>
          <span className="text-[13px] sm:text-xs md:text-lg text-white mt-1">{label}</span>
        </motion.div>
      ))}
    </div>
  </motion.div>
</AnimatePresence>



</div>


      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="p-5 bg-slate-50 rounded-md shadow-xl flex flex-col items-center max-w-4xl"
      >
        <div className="relative w-full h-48 sm:h-60 mb-3">
          <img
            src={wing.image}
            alt={wing.name}
            className="w-full h-full object-cover rounded-md"
          />
          <div
            onClick={handleOpenModal} // Open the modal when clicked
            className="absolute top-2 right-2 bg-white rounded-full lg:p-1 cursor-pointer"
          >
              <div className="relative w-8 h-8 group cursor-pointer">
  <IoMdAddCircle className="absolute inset-0 text-red-500 w-8 h-8 group-hover:opacity-0 transition-opacity duration-200" />
  <IoMdCheckmarkCircle className="absolute inset-0 text-green-500 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
</div>          </div>
        </div>
        <h3 className="text-red-600 font-bold text-2xl mb-1">{wing.name}</h3>
        
        {/* Render the price without the dollar sign or hide if the price is 0 */}
        <h3 className="text-black font-bold text-xl mb-1">CA {renderPrice(wing.price)}</h3>

        <p className="text-gray-700 text-center text-[12px] sm:text-lg">
          {wing.description}
        </p>

        {/* Vertical Carousel for Sauces */}
        <p className="bg-red-600 rounded-lg px-2 mt-4">Sauces Options</p>
        <div
          className="keen-slider h-14 bg-[#fffefe92] border-2 border-red-500 shadow-xl max-w-96 mt-3 relative p-4 items-center"
          ref={sliderRef}
        >
          {/* Duplicate the content to ensure smooth loop */}
          {wing.sauces.concat(wing.sauces).map((sauce, index) => (
            <motion.div
              key={index}
              className={`keen-slider__slide flex items-center justify-evenly -mt-4 mb-4 text-red-700 font-bold rounded-lg`}
            >
              <div className="px-4 py-2 flex items-center justify-center w-full">
                <span className="mr-2">{sauce.name}</span>
                <span className="text-red-300">
                  {"🌶️".repeat(sauce.hotLevel)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ItemModal for selecting the wing item */}
      {selectedItem && (
        <ItemModal
          isOpen={isModalOpen}
          category={selectedItem.category}  // Now this will always be 'wing'
          item={selectedItem} // Pass the entire item
          onClose={handleCloseModal}
          onAddToCart={(item) => {
            // console.log("Added item to cart:", item);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default Wings;
