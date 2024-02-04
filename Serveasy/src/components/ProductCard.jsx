import { useState } from "react";

import propTypes from "prop-types";
import { AiOutlineStar, AiFillStar, AiOutlineShopping } from "react-icons/ai";
// import Product from "../pages/Product";
import { NavLink, useNavigate } from "react-router-dom";
const ProductCard = ({ img, name, price, cuisine, ingredients }) => {
  // const [enter, setEnter] = useState(false);
  const navigate = useNavigate();
  // const handleEnter = () => {
  //   setEnter(!enter);
  //   console.log("enter:" + enter);
  // };
  const handleClick = () => {
    navigate("/product", {
      state: {
        img,
        name,
        price,
        cuisine,
        ingredients,
      },
    });
  };
  return (
    <div
      className="border border-gray-200 hover:border-gray-400 transition-transform rounded-lg relative"
      onClick={handleClick}
      // value={enter}
    >
      {/* {enter && (
        <NavLink
          to="/product"
          state={{
            image: img,
            price: price,
            name: name,
            cuisine: cuisine,
            ingredients: ingredients,
          }}
        >
          <Product />
        </NavLink>
      )} */}

      <img
        className="w-full h-[200px] object-cover rounded-lg rounded-b-none"
        src={img}
        alt={name}
      />
      <div className="space-y-2 relative p-4">
        <div className="text-yellow-400 flex gap-[5px] text-[20px]">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 px-3 py-1">
        <h3 className="font-medium">{name}</h3>
        <div className="grid grid-cols-2 gap-1 align-items-center">
          <h3 className="text-2xl font-medium text-warning ">
            {`Rs.` + price}
          </h3>
          <button className="absolute border-none bottom-2.5 right-2 bg-warning text-lightColor text-[28px] w-[100px] h-[50px] rounded-full flex justify-content-center items-center cursor-pointer pl-4 gap-1 hover:bg-primary hover:text-textColor">
            <AiOutlineShopping />
            <span className=" text-[14px]">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  img: propTypes.string,
  name: propTypes.string,
  price: propTypes.number,
  cuisine: propTypes.string,
  ingredients: propTypes.string,
};

export default ProductCard;
