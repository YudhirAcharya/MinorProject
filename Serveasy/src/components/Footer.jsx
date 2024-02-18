// import React from "react";
import { NavLink } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
const Footer = () => {
  const Year = new Date().getFullYear();
  return (
    <footer className="container min-w-full shadow-none rounded-none">
      <div className=" fixed-bottom mt-300 min-h-[450px] bg-primary  overflow-hidden z-[1]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="relative block fill-white w-100"
          ></path>
        </svg>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-15 text-[18px] px-4">
          <div className="flex flex-col">
            <h2 className="text-[22px] list-none mb-4 mt-8  font-semibold text-black py-2 uppercase">
              About Us:
            </h2>
            <p className="font-[300]">
              Serveasy is a multifaceted web app seamlessly blending meal
              recommendations and e-commerce, offering users personalized dining
              suggestions while incorporating a scheduling system, reviews, and
              ratings for an enhanced culinary experience.
            </p>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-[22px] mb-4 mt-8  list-none font-semibold text-black py-2 uppercase">
              Account Available:
            </h2>
            <ul>
              <li className="my-4 list-none ">
                <NavLink
                  to="/userLogin"
                  className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  User
                </NavLink>
              </li>
              <li className="my-4 list-none">
                <NavLink
                  to="/chef/chefLogin"
                  className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  Chef
                </NavLink>
              </li>
              <li className="mb-4 mt-8 list-none">
                <NavLink
                  to="/delivery/delivererLogin"
                  className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out"
                >
                  Deliverer
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-[22px] mb-4 mt-8   list-none font-semibold text-black py-2 uppercase">
              Contacts
            </h2>
            <ul>
              <li className="my-4 list-none">Email: serveasy@gmail.com</li>
              <li className="my-4 list-none ">
                <a href="tel:9800000000" className="text-headingColor">
                  Phone: +977 9800000001
                </a>
              </li>
            </ul>
            <h3>Follow us on:</h3>
            <div className="flex space-x-7 justify-center">
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaLinkedinIn size={30} />
              </a>
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaTwitter size={30} />
              </a>
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaInstagram size={30} />
              </a>
              <a
                href=""
                className="text-white hover:text-warning transform hover:scale-105 transition-all duration-150 ease-in-out "
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
          <div className="flex flex-col ">
            <h2 className="text-[22px] mb-4 mt-8  list-none font-semibold text-black py-2 uppercase">
              Developers
            </h2>
            <ul>
              <li className="my-4 list-none">Binayak Pradhan</li>
              <li className="my-4 list-none">Swornima Shrestha</li>
              <li className="my-4 list-none">Sauharda Khadka</li>
              <li className="my-4 list-none">Yudhir Acharya</li>
            </ul>
          </div>
        </div>
        <h6 className="text-center w-50 h-0 mt-2">
          &copy; Copy rights reserved {Year}
        </h6>
      </div>
    </footer>
  );
};

export default Footer;
