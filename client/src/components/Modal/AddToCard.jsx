import { useState } from "react";
import PizzaModal from "./PizzaModal"; // Import the PizzaModal
import { useDispatch } from "react-redux"; 
import { addToCart } from "../redux/slices/cartSlice"; // Assuming you have a slice for the cart

const AddToCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null); // This would be the pizza object selected by the user
  
  const dispatch = useDispatch();

  const handleAddToCart = (orderDetails) => {
    // Dispatch the order details to the Redux store (or handle cart logic)
    dispatch(addToCart(orderDetails)); // Add to cart slice action
    console.log("Item added to cart:", orderDetails);
  };

  const handleOpenModal = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button to open the pizza modal */}
      <button onClick={() => handleOpenModal({ name: "Pepperoni Pizza", description: "Delicious pepperoni pizza" })}>
        Add Pepperoni Pizza to Cart
      </button>

      {/* Pizza Modal */}
      {selectedPizza && (
        <PizzaModal
          isOpen={isModalOpen}
          pizza={selectedPizza}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default AddToCart;
