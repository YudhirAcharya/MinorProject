// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";
import NewsLetter from "../components/NewsLetter";
import Navbar from "../components/Navbar";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Category />

      <FeatureSection />
      <NewsLetter />
    </div>
  );
};

export default Home;
