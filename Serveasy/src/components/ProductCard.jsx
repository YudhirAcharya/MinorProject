// import React from 'react'
import propTypes from "prop-types";
import { AiOutlineStar, AiFillStar, AiOutlineShopping } from "react-icons/ai";
const ProductCard = ({ img, name, price }) => {
  return (
    <div className="border border-gray-200 hover:border-gray-400 transition-transform rounded-lg relative">
      <img
        className="w-full h-[200px] object-cover rounded-lg"
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
        <h3 className="font-medium">{name}</h3>
        <h3 className="text-2xl font-medium text-warning ">{price}</h3>
        <button className="absolute top-0.5 right-2 bg-secondary text-white text-[28px] w-[100px] h-[50px] rounded-full flex justify-content-center items-center cursor-pointer pl-4 gap-1 hover:bg-warning">
          <AiOutlineShopping />
          <span className=" text-[14px]">Add</span>
        </button>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  img: propTypes.string,
  name: propTypes.string,
  price: propTypes.number,
};

export default ProductCard;
