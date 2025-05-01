import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../../src/assets";
import letterlogo from "../../src/assets/pizzaday-logo.avif";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`
        ${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-white
      `}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <p className="text-red-600 text-[30px] md:text-[50px] font-bold cursor-pointer">
            HOORAY
            <span className="hidden md:inline">&nbsp;FOR PIZZA DAY &nbsp;</span>
          </p>
          <img
            src={letterlogo}
            alt="Pizza Day Logo"
            className="w-[80px] md:w-[100px]"
          />
        </Link>
        <div className="hidden md:flex flex-grow justify-center items-center">
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
        <div className="md:hidden flex items-center">
          <img
            src={toggle ? close : menu}
            alt="Menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black absolute top-16 right-4 w-[200px] min-w-[140px] rounded-lg`}
          >
            <ul className="list-none flex flex-col gap-4">
              {navLinks.map((navItem) => (
                <li
                  key={navItem.id}
                  className={`${
                    active === navItem.title ? "text-white" : "text-gray-400"
                  } font-poppins font-medium cursor-pointer text-[16px]`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(navItem.title);
                  }}
                >
                  <a href={`#${navItem.id}`}>{navItem.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;