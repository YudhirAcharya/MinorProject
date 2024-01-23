import React from "react";
import { useState } from "react";
import { navLinks } from "../constants";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className=" bg-primaryColor navbar w-full py-5 flex justify-between items-center">
      <img
        src="./public/logos/logo_name.png"
        alt="Serveasy logo"
        className="w-[120px]  mx-8 h-auto"
      />
      <ul className=" list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className=" cursor-pointer text-[22px] mr-6"
          >
            <a href={`${nav.id}`}></a>
            {nav.title}
          </li>
        ))}
      </ul>
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={
            toggle
              ? "./public/icons/menu_icon.png"
              : "./public/icons/menu_icon.png"
          }
          alt=""
        />
      </div>
    </nav>
  );
};

export default Navbar;
