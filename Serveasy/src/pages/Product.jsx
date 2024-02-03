import React, { useState } from "react";
import propTypes from "prop-types";
import { GiShoppingCart } from "react-icons/gi";
import { IoCartOutline, IoCloseOutline } from "react-icons/io5";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";

const Product = ({ image, price, name, cuisine, ingredients }) => {
  const [qty, setQty] = useState(0);
  return (
    <section className="flex flex-col justify-between lg:flex-row p-5 gap-16">
      <div className="flex flex-col gap-6 lg:w-3/4">
        {/* main image */}
        <img
          src={image}
          alt={name}
          className="w-full h-full aspect-square object-cover rounded-xl"
        />
        {/* Div for alternate images */}
        <div></div>
      </div>
      <div className="flex flex-col gap-4 p-5 lg:w-2/4">
        <div>
          <span className="text-primary font-semibold">{cuisine}</span>
          <h1 className="text-3xl font-bold uppercase">{name}</h1>
        </div>
        <p className="text-textColor">{`The ingredients used are: ${ingredients}.`}</p>
        <h6 className="text-2xl font-semibold">{`Rs. ` + price}</h6>
        <div className="mt-10">
          <div className="flex flex-row items-center py-2 px-4 rounded ">
            <button
              className="cursor-pointer bg-tertiary px-5 rounded-lg text-warning text-3xl border-none "
              onClick={() => {
                qty <= 0 ? setQty(0) : setQty(qty - 1);
              }}
            >
              -
            </button>
            <span className="px-6 py-4 rounded-lg text-warning font-semibold">
              {qty}
            </span>
            <button
              className="cursor-pointer bg-tertiary px-5 rounded-lg text-warning text-3xl border-none"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          <button className="flex items-center gap-4 justify-center bg-warning py-2 w-full text-lightColor rounded-lg shadow mt-5 hover:bg-primary hover:text-textColor border-none">
            <GiShoppingCart className="text-[38px] " />
            <span className="font-semibold py-3 px-2 rounded-xl h-full">
              Add to Cart
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
Product.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  price: propTypes.number,
  cuisine: propTypes.string,
  ingredients: propTypes.string,
};
export default Product;
