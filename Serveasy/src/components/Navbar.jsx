// import React from "react";
import { MdSearch } from "react-icons/md";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import CardCountBadge from "./CardCountBadge";
// import { navLinks } from "../constants";

const Navbar = () => {
  return (
    <div className="container hidden lg:block">
      <div className="flex justify-between items-center pt-8">
        <h1 className="text-4xl font-medium">
          <img
            className="w-[250px] h-[90px] ml-10"
            src="/public/logos/Logo Files/For Web/png/logo black.png"
            alt="serveasy logo"
          />
        </h1>
        <div className="relative w-full max-w-[500px]">
          <input
            className="bg-[#F5F5F5] border-none outline-none px-6 py-3 rounded-[30px] w-full"
            type="text"
            placeholder="Search Product"
          />
          <MdSearch
            className="absolute right-0 top-0 mt-4 mr-5 text-gray-500"
            size={20}
          />
        </div>
        <div className="flex gap-4">
          <button className="icon__wrapper">
            <AiOutlineUser /> {/* No hover class here */}
          </button>
          <button className="icon__wrapper">
            <AiOutlineShoppingCart /> {/* No hover class here */}
            <CardCountBadge size="w-[25px] h-[25px] hover:text-warning" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
