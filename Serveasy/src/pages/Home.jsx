// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";
import NewsLetter from "../components/NewsLetter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "./Product";
const Home = () => {
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
