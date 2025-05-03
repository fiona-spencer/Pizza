import { useState, useEffect } from "react";
import { Modal, Button, Label, Input } from "flowbite-react";

const AddToCart = ({ orderType, pizza, wings, sides, quantity, selectedAddons, note }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if the user is logged in (via session or local storage)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const checkUserSession = async () => {
    if (isLoggedIn) {
      // If logged in, directly add to the cart
      handleAddToCart();
    } else {
      // If not logged in, show the modal
      setIsModalOpen(true);
    }
  };

  const handleAddToCart = async () => {
    const orderDetails = {
      orderType,
      pizza,
      wings,
      sides,
      quantity,
      selectedAddons,
      note,
      userEmail: isLoggedIn ? user.email : userEmail, // Use email from session or provided email
    };

    console.log("Order Added to Cart:", orderDetails);
    setIsAdded(true);

    try {
      if (isLoggedIn) {
        // If logged in, update the order
        const response = await fetch("/api/updateOrder", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
          throw new Error("Failed to update order");
        }

        const data = await response.json();
        console.log("Order Updated:", data);
      } else {
        // If not logged in, create a new order
        const response = await fetch("/api/createOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
          throw new Error("Failed to create order");
        }

        const data = await response.json();
        console.log("Order Created:", data);
      }
    } catch (error) {
      console.error(error.message);
    }

    setIsModalOpen(false); // Close the modal after adding to cart
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateUser = async () => {
    // Create a new user when modal is submitted
    const newUser = { name: userName, email: userEmail };

    // Save user to localStorage (Simulating a login session)
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoggedIn(true);
    setUser(newUser);

    handleAddToCart(); // Proceed with adding to cart
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      <div className="space-y-4">
        <p><strong>Order Type:</strong> {orderType}</p>
        {pizza && (
          <>
            <p><strong>Pizza:</strong> {pizza.name}</p>
            <p><strong>Description:</strong> {pizza.description}</p>
          </>
        )}
        {wings && <p><strong>Wings:</strong> {wings}</p>}
        {sides && <p><strong>Sides:</strong> {sides}</p>}
        <p><strong>Quantity:</strong> {quantity}</p>
        <p><strong>Add-ons:</strong> {selectedAddons.join(", ")}</p>
        {note && <p><strong>Special Notes:</strong> {note}</p>}
      </div>
      <button
        onClick={checkUserSession} // Check session and either add to cart or show modal
        className="bg-red-600 text-white px-4 py-2 rounded-md mt-4"
      >
        {isAdded ? "Item Added to Cart" : "Add to Cart"}
      </button>

      {/* Modal for Full Name and Email if no user session */}
      <Modal show={isModalOpen} onClose={handleModalClose}>
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-center mb-4">Complete Your Order</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="full-name">Full Name</Label>
              <Input
                id="full-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button onClick={handleCreateUser}>Create Account and Add to Cart</Button>
            <Button onClick={handleModalClose}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddToCart;
