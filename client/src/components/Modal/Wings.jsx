import { motion } from "framer-motion";
import { IoMdAddCircle } from "react-icons/io";
import { styles } from "../../styles";
import { fadeIn } from "../../utils/motion";
import { wingsImages } from "../../constants"; // Import the wings data
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { useState, useEffect, useRef } from "react"; // Make sure useEffect is imported
import ItemModal from "./ItemModal"; // Import ItemModal

const Wings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  
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
    setSelectedItem(wing);  // Set the selected wing item
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // Helper function to render price
  const renderPrice = (price) => {
    if (!price || price === "" || price === "0" || price === 0) {
      return "Hidden";  // You can replace "Hidden" with any other text or just return nothing if you prefer
    }
    // If price exists and has value, we return it as is, without the dollar sign
    return price.replace(/[^0-9.]/g, ''); // This will remove any non-numeric characters including $
  };

  return (
    <div className="bg-[#323232] p-6 px-8 pb-10 flex flex-col lg:items-center lg:justify-center">
      <motion.div>
        <p className={`${styles.sectionSubText} md:pt-10 text-gray-400`}>flavor explosion</p>
        <h2 className={styles.sectionHeadText}><div className="text-red-600">Wings</div></h2>
      </motion.div>

      <div className="w-full flex items-center justify-center">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-[17px] lg:text-xl max-w-5xl pb-8 pt-4 text-white"
        >
          {wing.description}
        </motion.p>
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
            className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          >
            <IoMdAddCircle className="text-red-500 w-7 h-7" />
          </div>
        </div>
        <h3 className="text-red-600 font-bold text-2xl mb-1">{wing.name}</h3>
        
        {/* Render the price without the dollar sign or hide if the price is 0 */}
        <h3 className="text-black font-bold text-xl mb-1">{renderPrice(wing.price)}</h3>

        <p className="text-gray-700 text-center text-[12px]">
          Comes with ranch or blue cheese on request.
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
          category={selectedItem.category}  // Pass the category from the item
          item={selectedItem} // Pass the entire item
          onClose={handleCloseModal}
          onAddToCart={(item) => {
            console.log("Added item to cart:", item);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default Wings;
