import React, { useState, useEffect } from "react";
import { Alert } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/slices/cart/cartSlice";

const AddItem = ({ item, addOns, quantity, notes, onSuccess, onError }) => {
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const validQuantity = Number(quantity);
      const itemQuantity = isNaN(validQuantity) || validQuantity <= 0 ? 1 : validQuantity;

      // Log the price here
      console.log("Price in AddItem:", item.price);
      console.log("category:", item.category);

      const cartItem = {
        restaurantId: item.restaurantId || "temp-id", // Optional: provide a placeholder or source
        name: item.name,
        price: Number(item.price),
        quantity: itemQuantity,
        addOns: addOns.map(addOn => ({
          name: addOn.name,
          price: Number(addOn.price),
        })),
        notes: notes || "",
        category: item.category || "pizza",
      };

      dispatch(addCartItem(cartItem));
      setStatus("success");
      onSuccess?.();

      const successTimeout = setTimeout(() => {
        setStatus("idle");
      }, 3000);

      return () => clearTimeout(successTimeout);
    } catch (err) {
      console.error("Error adding item to Redux cart:", err);
      setStatus("error");
      onError?.();

      const errorTimeout = setTimeout(() => {
        setStatus("idle");
      }, 5000);

      return () => clearTimeout(errorTimeout);
    }
  }, [item, addOns, quantity, notes, onSuccess, onError, dispatch]);

  const alertClass = status === "success" ? "bg-transparent" : "bg-red-600";

  return (
    status !== "idle" && (
      <div
        className={`fixed top-20 sm:pt-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 transition-opacity duration-1000 opacity-100 ${alertClass}`}
        style={{
          animation:
            status === "success"
              ? "fadeIn 1s ease, fadeOut 1s ease 3s"
              : "fadeIn 1s ease, fadeOut 1s ease 5s",
        }}
      >
        <Alert
          color={status === "success" ? "success" : "failure"}
          className="text-white border-none rounded-lg"
        >
          {status === "success"
            ? "✅ Successfully added to cart!"
            : "❌ Failed to add to cart. Please try again."}
        </Alert>
      </div>
    )
  );
};

export default AddItem;
