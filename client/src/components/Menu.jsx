import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { pizzas } from "../constants";
import { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Button, Label, Radio, Textarea, Checkbox } from "flowbite-react";
import { IoMdAddCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { fadeIn } from "../utils/motion";
import { FaLeaf } from "react-icons/fa";  // Import FaLeaf icon
import { LuVegan } from "react-icons/lu";


const Pizza = ({ index, name, description, tags, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState("");
  const [note, setNote] = useState("");
  const [selectedAddons, setSelectedAddons] = useState([]);
const [quantity, setQuantity] = useState(1);


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      name,
      selectedAddons,
      quantity,
      note,
    });
    setIsAdded(true);
    setIsModalOpen(false);
  };
  

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
            <p className="text-gray-900 pt-1 -mr-3 text-[11px] sm:text-[14px]">
              {description}
            </p>
            <div className="-mt-2 sm:mt-3 gap-1 sm:items-center sm:inline flex">
            {tags.map((tag) => (
  <div key={tag.cost}>
    <p className="text-[18px] sm:text-[20px] text-black font-bold mt-5">
      {tag.cost}
    </p>
    <p className={`text-[12px] sm:text-[14px] sm:p-0 pl-3 pt-0.5 ${tag.color}`}>
      {/* Conditional Rendering for 'veg' and 'vega' */}
      {tag.name === "veg" ? (
        <>
          {tag.name} <FaLeaf className="inline-block text-green-500 ml-1" />
        </>
      ) : tag.name === "vega" ? (
        <>
          {tag.name} <LuVegan className="inline-block text-blue-500 ml-1" /> {/* Change color or icon */}
        </>
      ) : (
        tag.name
      )}
    </p>
  </div>
))}

            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
  show={isModalOpen}
  onClose={handleCloseModal}
  className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur"
>
  <div className="bg-red-500 w-full shadow-lg rounded-none">
    <Modal.Header className="text-xl font-semibold text-white bg-red-600 rounded-none border-b border-red-700">
      Add-ons for {name}
    </Modal.Header>
    <Modal.Body className="bg-[#e87272] text-white rounded-none">
      <div className="space-y-6">

        {/* Add-on Checkboxes */}
        <fieldset>
          <legend className="text-base font-medium mb-2">Choose add-ons:</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Extra Cheese", "Pepperoni", "Mushrooms"].map((option, idx) => (
              <Label key={idx} className="inline-flex items-center gap-2 text-sm">
               <input
  type="checkbox"
  value={option}
  checked={selectedAddons.includes(option)}
  onChange={(e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedAddons((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  }}
  className="w-5 h-5 text-red-600 bg-white border-white rounded-sm checked:bg-red-600 checked:border-white focus:ring-white focus:ring-2 appearance-none relative"
  style={{
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
  }}
/>

                {option}
              </Label>
            ))}
          </div>
        </fieldset>

        {/* Quantity Selector */}
        <div>
          <Label htmlFor="quantity" className="block text-sm font-medium mb-1">
            Quantity:
          </Label>
          <select
            id="quantity"
            className="w-fit bg-red-600 border border-white text-white font-bold rounded-none py-2 px-3 shadow-sm focus:ring-white focus:border-white text-md"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* Allergy Note */}
        <div>
          <Label htmlFor={`allergy-note-${index}`} className="block text-sm font-medium mb-1">
            Allergies or special notes:
          </Label>
          <Textarea
            id={`allergy-note-${index}`}
            placeholder="Write here..."
            className="w-full  text-black border border-white p-2 text-sm rounded-none focus:ring-black focus:border-black"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            color='light'
          />
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer className="flex justify-end gap-2 bg-red-600 rounded-none border-t border-red-700">
      <Button color='white' outline pill onClick={handleAddToCart} className="bg-white text-red-600 hover:bg-gray-100">
        Add to Cart
      </Button>
      <Button color="red" pill onClick={handleCloseModal} className="bg-red-700 hover:bg-red-800 text-white">
        Cancel
      </Button>
    </Modal.Footer>
  </div>
</Modal>



    </>
  );
};

const Menu = () => {
  return (
    <div>
      <motion.div>
        <p className={`${styles.sectionSubText} md:pt-10`}>detroit style</p>
        <h2 className={styles.sectionHeadText}>Pizza</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-[17px] max-w-5xl pb-8 pt-4 text-red-900"
        >
          Our famous 48-hour fermented dough is always baked fresh to order. All pies are 8x10.
        </motion.p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {pizzas.map((menu, index) => (
          <Pizza key={`pizza-${index}`} index={index} {...menu} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Menu, "menu");
