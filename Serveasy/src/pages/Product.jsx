import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import propTypes from "prop-types";
import { GiShoppingCart } from "react-icons/gi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BiSolidPurchaseTag } from "react-icons/bi";
// import { IoCartOutline, IoCloseOutline } from "react-icons/io5";
// import { GrFormPrevious } from "react-icons/gr";
// import { GrFormNext } from "react-icons/gr";

const Product = () => {
  const [qty, setQty] = useState(0);
  const { state } = useLocation();
  const { img, name, price, cuisine, ingredients } = state;
  const [buy, setBuy] = React.useState({});

  const handlePurchase = (evt) => {
    evt.preventDefault();
    setBuy((prevState) => ({
      ...prevState,
      orderId: Math.floor(Math.random() * 100000) + 1,
      userId: Math.floor(Math.random() * 1000) + 1,
      foodName: name,
      quantity: qty,
      totalprice: price * qty,
    }));
    setQty(0);
  };
  useEffect(() => {
    console.log(buy);
  }, [buy]);
  return (
    <>
      <Navbar />
      <section className="flex flex-col justify-between lg:flex-row pt-5 px-4 gap-12 bg-white">
        <div className="flex flex-col gap-2 lg:w-3/4">
          {/* main image */}
          <img
            src={img}
            alt={name}
            className="w-full h-[80%] aspect-square object-cover rounded-xl"
          />
          {/* Div for alternate images */}
          <div></div>
        </div>
        <div className="flex flex-col gap-4 p-5 lg:w-2/4">
          <div>
            <span className="text-primary font-semibold text-1xl">
              {cuisine}
            </span>
            <h1 className="text-5xl font-bold uppercase">
              {name}
            </h1>
          </div>
          <p className="text-textColor">{`The ingredients used are:`}</p>
          <p className="text-textColor">{`${ingredients}.`}</p>
          <h6 className="text-4xl font-semibold mt-5">
            {`Rs. ` + price}
          </h6>
          <div className="mt-5">
            <div className="flex flex-row items-center py-2 rounded ">
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
            <button
              className="flex items-center gap-4 justify-center bg-warning py-2 w-full text-lightColor rounded-lg shadow mt-5 hover:bg-primary hover:text-textColor border-none"
              onClick={handlePurchase}
              value={buy}
            >
              <BiSolidPurchaseTag className="text-[38px] " />
              <span className="font-semibold py-3 px-2 rounded-xl h-full">
                Buy Now
              </span>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
Product.propTypes = {
  img: propTypes.string,
  name: propTypes.string,
  price: propTypes.number,
  cuisine: propTypes.string,
  ingredients: propTypes.string,
};
export default Product;
