// import React from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Promotion from "../components/Promotion";
import HowItWorksSection from "../components/HowItWorksSection";
import ChefTeam from "../components/ChefTeam";
import { NavLink, Link } from "react-router-dom";
import Testimonial from "../components/Testimonial";
import { navLinks } from "../constants";

import { useState } from "react";

const Landing = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <>
        <nav className="bg-primary navbar w-full flex justify-between items-center">
          <Link to="/">
            <img
              src="./public/logos/logo_linear.png"
              alt="Serveasy logo"
              className="w-[200px] mx-5 h-auto"
            />
          </Link>
          <div className="flex flex-row gap-5 mx-0 my-0">
            {/* <SearchBar /> */}

            <NavLink
              to="http://127.0.0.1:3001/users/userLogin"
              className="border-2 text-[25px] mr-5 px-5 border-warning rounded-xl hover:bg-warning hover:text-lightColor cursor-pointer"
            >
              Login
              {/* <IoLogInOutline /> */}
            </NavLink>
            <NavLink
              to="http://127.0.0.1:3001/users/userRegister"
              className="border-2 text-[25px] mr-5 px-5 border-warning rounded-xl hover:bg-warning hover:text-lightColor cursor-pointer"
            >
              Register
            </NavLink>
          </div>
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={
                toggle
                  ? "./public/icons/close_icon.png"
                  : "./public/icons/menu_icon.png"
              }
              alt="menu"
              className="w-[40px] mr-6 cursor-pointer"
              // onClick={toggleMenu}
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
      </>
      <Banner />
      <Promotion />
      <HowItWorksSection />
      <Testimonial />
      <ChefTeam />

      <Footer />
    </>
  );
};

export default Landing;
