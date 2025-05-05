import React from "react";
import { HiShoppingCart } from "react-icons/hi";

const ShoppingCartIcon = ({ count = 0 }) => {
  return (
    <div className="relative inline-block ">
      <HiShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 hover:bg-red-200 hover:rounded-full hover:px-2" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#0e2d39]  border-black border-1  text-white text-xs font-medium px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default ShoppingCartIcon;
