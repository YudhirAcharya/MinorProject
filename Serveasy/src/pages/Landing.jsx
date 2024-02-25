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
              to="/AccountSelection"
              className="border-2 md:text-[25px] md:mr-5 px-5 border-warning rounded-xl hover:bg-warning hover:text-lightColor cursor-pointer vsm:text-[16px]"
            >
              Login
              {/* <IoLogInOutline /> */}
            </NavLink>
            <NavLink
              to="/AccountRegister"
              className="border-2 md:text-[25px] mr-5 px-5 border-warning rounded-xl hover:bg-warning hover:text-lightColor cursor-pointer vsm:text-[16px]"
            >
              Register
            </NavLink>
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
