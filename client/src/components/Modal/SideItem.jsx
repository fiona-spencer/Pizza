import { useState } from "react";
import { motion } from "framer-motion";
import { IoMdAddCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { FaLeaf } from "react-icons/fa";
import { fadeIn } from "../../utils/motion";
import ItemModal from "./ItemModal";  // Import the ItemModal

const SideItem = ({ index, name, description, tags, image, category = "sides" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddToCart = (item) => {
    console.log("Added item:", item);
    setIsAdded(true);
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        variants={fadeIn("up", "spring", index * 0.5, 0.75)}
        initial="hidden"
        animate="show"
        className="p-1 bg-white rounded-md flex flex-col shadow-xl"
      >
        <div className="relative w-full h-40 mb-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-t-md"
          />
          <div
            onClick={handleOpenModal}
            className="absolute top-2 right-2 bg-white rounded-full p-1 cursor-pointer"
          >
            {isAdded ? (
              <IoMdCheckmarkCircle className="text-green-500 w-6 h-6" />
            ) : (
              <IoMdAddCircle className="text-red-500 w-6 h-6" />
            )}
          </div>
        </div>
        <div className="px-2 pb-1">
          <h3 className="text-red-600 font-bold text-sm">{name}</h3>
          <p className="text-gray-700 text-xs mt-1">{description}</p>
          <div className="mt-2">
            {tags.map((tag, idx) => (
              <div key={idx}>
                <p className="font-semibold text-black text-base">{tag.cost}</p>
                <p className={`text-xs ${tag.color}`}>
                  {tag.name === "veg" ? (
                    <>
                      {tag.name} <FaLeaf className="inline-block ml-1 text-green-500" />
                    </>
                  ) : (
                    tag.name
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Pass category dynamically */}
      <ItemModal
        isOpen={isModalOpen}
        category={category}  // Passing the category prop to ItemModal
        item={{ name, description, tags, image }} // Passing the item details
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};

export default SideItem;
