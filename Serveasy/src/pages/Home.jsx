// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import CartContainer from "./CartContainer";
import { useEffect, useState } from "react";

import { useStateValue } from "../context/StateProvider";
import Cookies from "js-cookie";
// import Landing from "./Landing";
import Recommend from "../components/Recommend";

const Home = () => {
  const [{ cartShow }, dispatch] = useStateValue();
  const [userExists, setUserExists] = useState(false);
  const userId = Cookies.get("userId");
  // useEffect(() => {
  //   const getUrlParameter = (name, url) => {
  //     if (!url) url = window.location.href;
  //     const params = new URLSearchParams(new URL(url).search);
  //     return params.get(name);
  //   };

  //   const userId = getUrlParameter("userId");

  //   localStorage.setItem("userId", []);
  //   let cleanUserId = userId && userId.replace(/\/\?status=Completed$/, "");
  //   Cookies.set("userId", userId);
  //   localStorage.setItem("userId", cleanUserId);
  // }, []);

  return (
    <div>
      <Navbar />
      {/* <Hero />
      <Category /> */}
      <div className="flex justify-center items-center mx-0 my-0 mt-3">
        <div className=" w-4/5 ">
          <Recommend />
        </div>
      </div>
      <FeatureSection />
      <Footer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default Home;
