// import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Promotion from "../components/Promotion";
import HowItWorksSection from "../components/HowItWorksSection";
import ChefTeam from "../components/ChefTeam";

import Testimonial from "../components/Testimonial";

import SelectionForm from "./SelectionForm";
import Recommend from "../components/Recommend";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Promotion />
      <HowItWorksSection />
      <Testimonial />
      <ChefTeam />

      <Footer />
    </>
  );
};

export default Landing;
