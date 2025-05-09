import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdAddCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { fadeIn } from "../../utils/motion";
import ItemModal from "./ItemModal";  // Import the ItemModal
import { FaLeaf } from "react-icons/fa";
import { LuVegan } from "react-icons/lu";


const SideItem = ({ index, name, description, tags, image, category = "side" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Function to open the modal and log the category
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddToCart = (item) => {
    setIsAdded(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className=" bg-white rounded-md flex flex-col shadow-xl"
      >
        <div className="relative w-full h-40 mb-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-md"
          />
          <div
            onClick={handleOpenModal} // Trigger handleOpenModal when clicked
            className="absolute top-2 right-2 bg-white rounded-full md:p-1 cursor-pointer"
          >
                       <div className="relative w-8 h-8 group cursor-pointer">
  <IoMdAddCircle className="absolute inset-0 text-red-500 w-8 h-8 group-hover:opacity-0 transition-opacity duration-200" />
  <IoMdCheckmarkCircle className="absolute inset-0 text-green-500 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
</div>   
          </div>
        </div>
        <div className="px-2 pb-1">
          <h3 className="text-red-600 font-bold text-md sm:text-lg md:text-xl">{name}</h3>
          <p className="text-gray-700 text-xs mt-1 text-[12px] sm:text-[15px] lg:text-lg">{description}</p>
          <div className="mt-2 flex flex-col items-center">
            {tags.map((tag, idx) => {
              return (
                <div key={idx} className="text-center mb-2">
                  {/* Displaying price inside the tag */}
                  <p className="font-semibold text-black text-base">CA {tag.price}</p>
                  <p className={`text-xs ${tag.color}`}>
                  {tag.name === "veg" ? (
  <>
    {tag.name} <FaLeaf className={`inline-block ml-1 ${tag.color}`} />
  </>
) : tag.name === "vega" ? (
  <>
    {tag.name} <LuVegan className={`inline-block ml-1 ${tag.color}`} />
  </>
) : (
  tag.name
)}

                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Pass category, price, and item props to the ItemModal */}
      <ItemModal
        isOpen={isModalOpen}
        category={category}  // Pass the category prop
        item={{ name, description, tags, image }} // Price is now part of the tags
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default SideItem;
