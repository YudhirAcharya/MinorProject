// import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Promotion from "../components/Promotion";
import HowItWorksSection from "../components/HowItWorksSection";
import ChefTeam from "../components/ChefTeam";

import Testimonial from "../components/Testimonial";

import SelectionForm from "./SelectionForm";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Promotion />
      <HowItWorksSection />
      <ChefTeam />

      <Testimonial />

      <SelectionForm />

      <Footer />
    </>
  );
};

export default Landing;
