import { Modal, Button, Label, Textarea, Checkbox } from "flowbite-react";
import { useState } from "react";

const PizzaModal = ({ isOpen, pizza, onClose, onAddToCart }) => {
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const handleAddToCart = () => {
    // Pass the form data to the parent component
    onAddToCart({
      orderType: "pizza", // Modify if you have other types
      pizza,
      quantity,
      selectedAddons,
      note,
    });
    onClose(); // Close the modal after adding to cart
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <div className="bg-red-500 w-full shadow-lg rounded-none">
        <Modal.Header className="text-xl font-semibold text-white bg-red-600 rounded-none border-b border-red-700">
          Add-ons for {pizza.name}
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
              <Label htmlFor="note" className="block text-sm font-medium mb-1">
                Allergies or special notes:
              </Label>
              <Textarea
                id="note"
                placeholder="Write here..."
                className="w-full text-black border border-white p-2 text-sm rounded-none focus:ring-black focus:border-black"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                color="light"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end gap-2 bg-red-600 rounded-none border-t border-red-700">
          <Button
            color="white"
            outline
            pill
            onClick={handleAddToCart}
            className="bg-white text-red-600 hover:bg-gray-100"
          >
            Add to Cart
          </Button>
          <Button
            color="red"
            pill
            onClick={onClose}
            className="bg-red-700 hover:bg-red-800 text-white"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default PizzaModal;
