import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../../constants";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import ShoppingCartIcon from "../Modal/ShoppingCartIcon";
import letterlogo from '../../assets/logo.svg';
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

// Navbar Component
const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navigate = useNavigate();

  // Get cart items from Redux store using useSelector
  const cartItems = useSelector((state) => state.cart.items); // Access the cart items from the Redux store

  // Update the navbar height dynamically
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }

    const handleResize = () => {
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to calculate the total quantity in the cart from Redux state
  const getCartTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const cartCount = getCartTotalQuantity(); // Get the total quantity in the cart

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="w-full fixed top-0 z-20 bg-gray-50 shadow-xl flex">
      <div className="max-w-7xl sm:mx-auto flex justify-between items-center lg:py-5 py-2 lg:px-8 md:mt-3 mt-1">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <Link
            to="/"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={letterlogo}
              alt="Pizza Day Logo"
              className="w-auto md:h-24 lg:h-24 h-12 md:-my-4 opacity-90 mx-10"
            />
          </Link>
        </div>

        {/* Shopping Cart and Hamburger */}
        <div className="flex flex-row items-center gap-2 absolute md:-top-1 lg:top-3 top-3 right-4 z-30">
          {/* Shopping Cart */}
          <div
            className="relative pt-2 sm:p-8 sm:pt-8 rounded-full cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCartIcon count={cartCount} />
          </div>

          {/* Mobile Hamburger Menu */}
          <div
            className="w-12 h-12 flex items-center justify-center cursor-pointer p-2 transition-transform duration-300 sm:hidden"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? (
              <HiX className="text-red-800 w-8 h-8" />
            ) : (
              <HiMenuAlt3 className="text-red-600 w-8 h-8" />
            )}
          </div>
        </div>

        {/* Navbar Items for Larger Screens */}
        <div className="hidden md:flex flex-grow justify-center -mt-4">
          <ul className="list-none flex flex-row gap-10  md:mr-14 md:gap-7 lg:gap-14 lg:ml-6">
            {navLinks.map((navItem) => (
              <li
                key={navItem.id}
                className={`${
                  active === navItem.title ? "text-red-400" : "text-red-400"
                } hover:text-red-300 text-[18px] md:text-[30px] font-bold cursor-pointer hover:underline`}
                onClick={() => {
                  setActive(navItem.title);
                  handleScroll(navItem.id);
                }}
              >
                <a href={`#${navItem.id}`}>{navItem.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Items */}
        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-red-600 absolute top-24 right-4 w-40 min-w-[140px] shadow-md rounded-md`}
        >
          <ul className="list-none flex flex-col gap-2 w-full">
            {navLinks.map((navItem) => (
              <li
                key={navItem.id}
                className={`${
                  active === navItem.title ? "text-white" : "text-gray-100"
                } font-poppins font-medium cursor-pointer text-xl px-3 py-2 bg-red-400 rounded-sm hover:bg-white hover:text-red-600 transition-all duration-200`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(navItem.title);
                  handleScroll(navItem.id);
                }}
              >
                <a href={`#${navItem.id}`} className="w-full block">
                  {navItem.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
