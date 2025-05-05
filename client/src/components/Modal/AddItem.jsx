import React, { useState, useEffect } from "react";
import { Alert } from "flowbite-react";

const AddItem = ({ item, addOns, quantity, notes, onSuccess, onError }) => {
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const addToCart = async () => {
      setLoading(true);

      try {
        const res = await fetch("/api/restaurant/getRest", { method: "GET" });

        if (!res.ok) throw new Error("Failed to fetch restaurant");

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No restaurants found");
        }

        const restaurant = data.find(r => r.name === "Hooray for Pizza Day") || data[0];
        const restaurantId = restaurant._id;
        console.log("Restaurant ID:", restaurantId);

        if (!restaurantId) throw new Error("Restaurant ID not found");

        const validQuantity = Number(quantity);
        const itemQuantity = isNaN(validQuantity) || validQuantity <= 0 ? 1 : validQuantity;

        const cartItem = {
          restaurantId,
          name: item.name,
          price: Number(item.price),  // Use price from item here
          quantity: itemQuantity,
          addOns: addOns.map(addOn => ({
            name: addOn.name,
            price: Number(addOn.price),
          })),
          notes: notes || "",
          category: item.category || "pizza",
        };

        console.log("Cart Item Payload:", cartItem);

        const response = await fetch(`/api/menu/addItem`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
        });

        const responseData = await response.json();
        console.log("API Response:", responseData);

        if (!response.ok) {
          throw new Error(`Failed to add menu item: ${responseData.message || 'Unknown error'}`);
        }

        setStatus("success");
        onSuccess?.();

        // Only reset status after a short delay
        const successTimeout = setTimeout(() => {
          setStatus("idle");
        }, 3000);

        return () => clearTimeout(successTimeout);
      } catch (err) {
        console.error("Error adding item:", err);
        setStatus("error");
        onError?.();

        const errorTimeout = setTimeout(() => {
          setStatus("idle");
        }, 5000);

        return () => clearTimeout(errorTimeout);
      } finally {
        setLoading(false);
      }
    };

    addToCart();
  }, [item, addOns, quantity, notes, onSuccess, onError]);

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
