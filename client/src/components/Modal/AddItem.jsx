import React, { useState, useEffect } from "react";
import { Alert } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/slices/cart/cartSlice";

const AddItem = ({ item, addOns, quantity, notes, onSuccess, onError }) => {
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  useEffect(() => {
    const addToCart = async () => {
      try {
        // Fetch all items from the backend to check availability
        const res = await fetch("/api/menu/getItems");
        if (!res.ok) throw new Error("Failed to fetch menu items");
        const allItems = await res.json();

        // Find the current item by name
        const currentItem = allItems.find((menuItem) => menuItem.name === item.name);

        // Check if the item exists and is available
        if (!currentItem || !currentItem.isAvailable) {
          setStatus("error");
          onError?.();
          const errorTimeout = setTimeout(() => setStatus("idle"), 5000);
          return () => clearTimeout(errorTimeout);
        }

        // Proceed if the item is available

        const validQuantity = Number(quantity);
        const itemQuantity = isNaN(validQuantity) || validQuantity <= 0 ? 1 : validQuantity;

        // Ensure item price is valid
        const itemPrice = Number(item.price);

        // Sum up the add-ons price
        const totalAddOnsPrice = addOns.reduce((total, addOn) => {
          const addOnPrice = Number(addOn.price);
          return total + (isNaN(addOnPrice) ? 0 : addOnPrice);
        }, 0);

        // Total price includes base item price and add-ons
        const totalPrice = itemPrice * itemQuantity + totalAddOnsPrice;

        const cartItem = {
          restaurantId: item.restaurantId || "temp-id", // Optional: provide a placeholder or source
          name: item.name,
          price: totalPrice, // Updated to include add-ons
          quantity: itemQuantity,
          addOns: addOns.map((addOn) => ({
            name: addOn.name,
            price: Number(addOn.price), // Ensure valid add-on price
          })),
          notes: notes || "",
          category: item.category || "pizza",
        };

        // Dispatch to add item to the cart
        dispatch(addCartItem(cartItem));
        setStatus("success");
        onSuccess?.();

        // Set a timeout for success alert
        const successTimeout = setTimeout(() => setStatus("idle"), 3000);
        return () => clearTimeout(successTimeout);
      } catch (err) {
        console.error("Error adding item to cart:", err);
        setStatus("error");
        onError?.();
        const errorTimeout = setTimeout(() => setStatus("idle"), 5000);
        return () => clearTimeout(errorTimeout);
      }
    };

    addToCart();
  }, [item, addOns, quantity, notes, onSuccess, onError, dispatch]);

  const alertClass = status === "success" ? "bg-transparent" : "bg-red-600";

  return (
    status !== "idle" && (
      <div
        className={`fixed top-20 sm:pt-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 transition-opacity bg-transparent duration-1000 opacity-100 ${alertClass}`}
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
            : "❌ Currently unavailable. Please try again later."}
        </Alert>
      </div>
    )
  );
};

export default AddItem;
