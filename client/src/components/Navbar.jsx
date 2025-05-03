import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import letterlogo from "../../src/assets/logo.svg";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const cartCount = 3; // Example dynamic count
  const navigate = useNavigate(); // <-- Add this line

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
      <div className="max-w-7xl sm:mx-auto flex justify-between items-center md:py-5 py-2 md:px-8 sm:mt-3 mt-1">
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
              className="w-auto md:h-24 h-12 sm:-my-4 opacity-90 mx-10"
            />
          </Link>
        </div>

        {/* Shopping Cart and Hamburger */}
        <div className="flex flex-row items-center gap-2 absolute sm:top-2 top-3 right-4 z-30">
          {/* Shopping Cart */}
          <div
            className="relative pt-2 sm:p-8 sm:pt-8 rounded-full cursor-pointer"
            onClick={() => navigate("/order")}
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
          <ul className="list-none flex flex-row gap-10 sm:gap-14 sm:ml-60">
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
