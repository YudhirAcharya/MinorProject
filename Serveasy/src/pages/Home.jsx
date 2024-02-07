// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";
import NewsLetter from "../components/NewsLetter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
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
      <Navbar />
      <Hero />
      <Category />
      <FeatureSection />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
