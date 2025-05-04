import React, { useEffect, useState } from "react";
import { Alert } from "flowbite-react";

const AddItem = ({ item, addOns, quantity, onSuccess, onError }) => {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    try {
      // Simulate adding item to cart
      const cartItem = { ...item, addOns, quantity };
      console.log("Add to cart:", cartItem);

      setStatus("success");
      onSuccess?.(); // Notify parent if needed

      // Dismiss success alert after 3 seconds and reload the window
      const successTimeout = setTimeout(() => {
        setStatus("idle"); // Reset status to idle
        window.location.reload(); // Reload the page after success
      }, 3000);

      return () => clearTimeout(successTimeout); // Cleanup timeout if component unmounts
    } catch (err) {
      setStatus("error");
      onError?.();

      // Dismiss error alert after 5 seconds
      const errorTimeout = setTimeout(() => {
        setStatus("idle"); // Reset status to idle
      }, 5000);

      return () => clearTimeout(errorTimeout); // Cleanup timeout if component unmounts
    }
  }, [item, addOns, quantity, onSuccess, onError]);

  // Custom class for success and error status
  const alertClass = status === "success" ? "bg-transparent" : "bg-red-600"; // Set green for success and red for error

  return status !== "idle" ? (
    <div
      className={`fixed top-[110px] sm:pt-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 transition-opacity duration-1000 opacity-100 ${alertClass}`}
      style={{
        animation: status === "success" ? "fadeIn 1s ease, fadeOut 1s ease 3s" : "fadeIn 1s ease, fadeOut 1s ease 5s",
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
  ) : null;
};

export default AddItem;
