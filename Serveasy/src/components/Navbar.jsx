import { useState } from "react";
import { navLinks } from "../constants";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <nav className="bg-primary navbar w-full py-3 flex justify-between items-center">
      <Link to="/">
        <img
          src="./public/logos/Logo Files/For Web/svg/Color logo - no background.svg"
          alt="Serveasy logo"
          className="w-[100px] mx-8 h-auto"
        />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav) => (
          <li key={nav.id} className="cursor-pointer mr-6">
            <NavLink
              to={nav.path}
              className={({ isActive }) =>
                `text-[22px] ${isActive ? "text-black" : "text-warning"}`
              }
            >
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <NavLink
        to="/signing"
        className="border-2 text-[30px] mr-5 px-5 border-warning rounded-xl hover:bg-warning hover:text-lightColor cursor-pointer"
      >
        Join us
      </NavLink>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={
            toggle
              ? "./public/icons/close_icon.png"
              : "./public/icons/menu_icon.png"
          }
          alt="menu"
          className="w-[40px] mr-6 cursor-pointer"
          onClick={toggleMenu}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } absolute mt-[270px] py-6 bg-primaryColor px-6 border-2`}
        >
          <ul className="list-none flex flex-col sm:even:hidden justify-end items-center flex-1">
            {navLinks.map((nav) => (
              <li
                key={nav.id}

                className="cursor-pointer text-[22px] mr-6 hover:text-warning"
              >
                <NavLink to={`${nav.id}`}>{nav.title}</NavLink>


              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
