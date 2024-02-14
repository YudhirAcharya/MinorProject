// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import AccountSelection from "../components/AccountSelection";
// import HomeChef from "./HomeChef";
// import HomeDelivery from "./HomeDelivery";

import CartContainer from "./CartContainer";
import { useEffect } from "react";

// import { useStateValue } from "../context/StateProvider";

// import Landing from "./Landing";
import Recommend from "../components/Recommend";
import { useCartContext } from "../context/cartContext";
// import SearchBar from "../components/SearchBar";
// import ProductCard from "../components/ProductCard";
// import Product from "./Product";

const Home = () => {
  // const [{ cartShow }, dispatch] = useStateValue();
  // // const [scrollValue, setScrollValue] = useState(0);

  // useEffect(() => {}, [cartShow]);
  // // const [auth, setAuth] = useState(false);
  // // const [message, setMessage] = useState("");
  // // const [name, setName] = useState("");
  // // useEffect(() => {
  // //   axios.get("/").then((res) => {
  // //     if (res.data.Status === "Success") {
  // //       setAuth(true);
  // //       setName(res.data.name);
  // //       navigate("/login");
  // //     } else {
  // //       setAuth(false);
  // //       setMessage(res.data.Error);
  // //     }
  // //   });
  // // }, []);
  const { cartShow } = useCartContext();
  useEffect(() => {}, [cartShow]);
  console.log(cartShow);
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <div className="flex justify-center items-center mx-0 my-0 mt-3">
        <div className=" w-4/5 ">
          <Recommend />
        </div>
      </div>

      <FeatureSection />
      <Footer />
      {cartShow && <CartContainer />}
      <CartContainer />
    </div>
  );
};

export default Home;
