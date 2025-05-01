import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import letterlogo from "../../src/assets/logo.svg"; // Assuming this is your new logo image.
import { HiMenuAlt3, HiX } from "react-icons/hi"; // or from @heroicons/react/outline

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full fixed top-0 z-20 bg-gray-50 shadow-xl">
      {/* Outer container with centering */}
      <div className="max-w-7xl mx-auto flex justify-between items-center md:py-5 py-3 px-4 md:px-8 mt-3">
     

        {/* Logo Centered for Mobile View */}
        <div className="flex-1 flex justify-center md:justify-start">
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
              className="w-auto md:h-20 h-12 opacity-90 mx-10" // Adjust size as needed
            />
          </Link>
        </div>

               {/* Mobile Hamburger Menu (Right Side) */}
               <div
  className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center cursor-pointer  p-2  transition-transform duration-300 z-30 md:hidden"
  onClick={() => setToggle(!toggle)}
>
  {toggle ? (
    <HiX className="text-red-600 w-8 h-8" />
  ) : (
    <HiMenuAlt3 className="text-red-600 w-8 h-8" />
  )}
</div>




        {/* Large Screen Navbar Items (To the Right) */}
        <div className="hidden md:flex flex-grow justify-end">
          <ul className="list-none flex flex-row gap-10">
            {navLinks.map((navItem) => (
              <li
                key={navItem.id}
                className={`${
                  active === navItem.title ? "text-red-400" : "text-red-400"
                } hover:text-red-300 text-[18px] md:text-[26px] font-bold cursor-pointer hover:underline`}
                onClick={() => setActive(navItem.title)}
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
