// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import axios from "axios";
// import { useEffect, useState } from "react";
import Landing from "./Landing";
const Home = () => {
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
      <Landing />
      <Navbar />
      <Hero />
      <Category />
      <FeatureSection />

      <Footer />
    </div>
  );
};

export default Home;
