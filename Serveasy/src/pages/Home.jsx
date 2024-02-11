// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import axios from "axios";
// import { useEffect, useState } from "react";
import CartContainer from "../components/cartContainer";
import { useEffect } from "react";

import { useStateValue } from "../context/StateProvider";

const Home = () => {
  const [{ cartShow }, dispatch] = useStateValue();
  // const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [cartShow]);
  // const [auth, setAuth] = useState(false);
  // const [message, setMessage] = useState("");
  // const [name, setName] = useState("");
  // useEffect(() => {
  //   axios.get("/").then((res) => {
  //     if (res.data.Status === "Success") {
  //       setAuth(true);
  //       setName(res.data.name);
  //       navigate("/login");
  //     } else {
  //       setAuth(false);
  //       setMessage(res.data.Error);
  //     }
  //   });
  // }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <FeatureSection />
      <Footer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default Home;
