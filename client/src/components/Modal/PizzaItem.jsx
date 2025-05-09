import { IoMdAddCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { LuVegan } from "react-icons/lu";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import ItemModal from "./ItemModal";

const PizzaItem = ({ index, name, description, tags, image, category = 'pizza' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddToCart = (itemDetails) => {
    setIsAdded(true);
  };

  // Safely extract price from tags
  const price = tags?.[0]?.price ? parseFloat(tags[0].price).toFixed(2) : "N/A";

  return (
    <>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="p-3 pb-1 sm:p-4 md:p-5 bg-white rounded-md flex flex-col lg:flex-col shadow-xl"
      >
        <h3 className="text-red-600 font-bold text-[18px] sm:text-[20px] md:text-[24px] sm:mb-3 block lg:hidden ml-2">
          {name}
        </h3>

        <div className="flex flex-row-reverse lg:flex-col sm:items-center justify-between">
          {/* Image and Icon */}
          <div className="relative sm:lg:w-full sm:h-[230px] h-fit sm:right-0 -top-1">
            <img
              src={image}
              alt={name}
              className="h-32 w-32 sm:w-full sm:h-full object-cover rounded-md"
            />
            <div className="absolute top-2 right-2">
              <div
                onClick={handleOpenModal}
                className="black-gradient w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                {isAdded ? (
                  <IoMdCheckmarkCircle className="text-green-500 w-8 h-8" />
                ) : (
                  <IoMdAddCircle className="text-red-500 w-8 h-8" />
                )}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="sm:mt-4 lg:mt-4 w-1/2 lg:w-full mx-2 sm:pr-3 lg:pr-0 lg:text-center">
            <h3 className="hidden lg:block text-red-600 font-bold text-[20px] md:text-[24px] mb-2">
              {name}
            </h3>
            <p className="text-gray-900 pt-1 -mr-3 lg:mr-2 text-[12px] sm:text-[17px] md:text-lg">
              {description}
            </p>

         <div className="flex lg:inline items-center lg:justify-center lg:items-end sm:gap-4">
             {/* Price */}
             <p className="text-[18px] sm:text-[20px] text-black font-bold sm:mt-5 mt-2">
              CA {price}
            </p>

            {/* Tags */}
            <div className="sm:mt-3 gap-1 sm:items-center sm:inline flex mt-1">
              {tags
                .filter((tag) => tag.name)
                .map((tag, i) => (
                  <p
                    key={i}
                    className={`text-[12px] sm:text-[14px] sm:p-0 pl-3 pt-0.5 ${tag.color}`}
                  >
                    {tag.name === "veg" ? (
                      <>
                        {tag.name} <FaLeaf className="inline-block text-green-500 ml-1" />
                      </>
                    ) : tag.name === "vega" ? (
                      <>
                        {tag.name} <LuVegan className="inline-block text-blue-500 ml-1" />
                      </>
                    ) : (
                      tag.name
                    )}
                  </p>
                ))}
            </div>
         </div>
          </div>
        </div>
      </motion.div>

      <ItemModal
        isOpen={isModalOpen}
        category={category}
        item={{name, description, image, tags, price, category }}
        price={price}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default PizzaItem;
