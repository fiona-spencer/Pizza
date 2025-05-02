import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { sides } from "../constants";
import { useState } from "react";
import { motion } from "framer-motion";
import { Modal, Button, Label, Textarea } from "flowbite-react";
import { IoMdAddCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { fadeIn } from "../utils/motion";
import { FaLeaf } from "react-icons/fa";

const SideItem = ({ index, name, description, tags, image }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [note, setNote] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAddToCart = () => {
    console.log("Added side:", { name, quantity, note });
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
<h3 className="text-red-600 font-bold text-md">{name}</h3> {/* Smaller font size */}
        <p className="text-gray-700 text-[11px] mt-1">{description}</p> {/* Smaller font size */}
        <div className="mt-2">
          {tags.map((tag, idx) => (
            <div key={idx}>
              <p className="font-semibold text-black text-lg">{tag.cost}</p> {/* Smaller font size */}
              <p className={`text-xs ${tag.color}`}> {/* Smaller font size */}
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

      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Add {name}</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="side-qty">Quantity</Label>
              <select
                id="side-qty"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                {[1, 2, 3, 4, 5].map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="side-note">Notes</Label>
              <Textarea
                id="side-note"
                placeholder="Any special instructions..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
          <Button color="gray" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Sides = () => {
  return (
    <div>
      <motion.div>
        <p className={`${styles.sectionSubText} -mt-10`}>more to love</p> {/* Smaller font size */}
        <h2 className={`${styles.sectionHeadText}`}>Sides</h2> {/* Smaller font size */}
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="text-[15px] max-w-5xl pb-8 pt-4 text-red-900"
        >
          Classic sides to complete your meal – fresh, crispy, and delicious.
        </motion.p> {/* Smaller font size */}
      </div>

      <div className="grid grid-cols-2  lg:grid-cols-3 gap-7">
        {sides.map((side, index) => (
          <SideItem key={`side-${index}`} index={index} {...side} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Sides, "sides");
