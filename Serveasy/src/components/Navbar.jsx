import { useState } from "react";
import { navLinks } from "../constants";
import { Link, NavLink } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  // const [{ cartShow, cartItems }, dispatch] =
  //   useStateValue();
  const toggleMenu = () => {
    setToggle(!toggle);
  };
  // const showCart = () => {
  //   dispatch({
  //     type: actionType.SET_CART_SHOW,
  //     cartShow: !cartShow,
  //   });
  // };
  return (
    <nav className="bg-primary navbar w-full flex justify-between items-center">
      <Link to="/">
        <img
          src="./public/logos/logo_linear.png"
          alt="Serveasy logo"
          className="w-[200px] mx-5 h-auto"
        />
      </Link>
      <div className="flex flex-row gap-5 mx-0 my-0">
        <SearchBar />
        <ul className="list-none sm:flex hidden justify-center items-center flex-1">
          {navLinks.map((nav) => (
            <li key={nav.id} className="cursor-pointer mr-6">
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  `border-2 text-[30px]  px-5 py-2 border-warning rounded-xl hover:bg-warning hover:text-lightColor cursor-pointer ${isActive ? "text-black" : "text-warning"} `
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
          JoinUS
        </NavLink>
        <div
          // to="/Cart"
          // onClick={showCart}
          className="text-[2rem] hover:bg-warning hover:text-lightColor mx-1 my-4 border-2 p-2 rounded-full border-warning relative"
        >
          <IoCart />
          {/* {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 right-0 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold ">
                {cartItems.length}
              </p>
            </div>
          )} */}
        </div>
        <NavLink
          to="/Account"
          className="text-[2rem] hover:bg-warning hover:text-lightColor mx-5 border-2 p-2 rounded-full border-warning"
        >
          <FaCircleUser />
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
