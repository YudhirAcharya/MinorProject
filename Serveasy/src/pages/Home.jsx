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
import { useEffect, useState } from "react";

import { useStateValue } from "../context/StateProvider";

// import Landing from "./Landing";
import Recommend from "../components/Recommend";
// import { useCartContext } from "../context/cartContext";
// import LoginUser from "./LoginUser";
// import SearchBar from "../components/SearchBar";
// import ProductCard from "../components/ProductCard";
// import Product from "./Product";

// const Home = () => {
//   const [{ cartShow }, dispatch] = useStateValue();

//   useEffect(() => {}, [cartShow]);
//   const [userExists, setUserExists] = useState(false);
//   useEffect(() => {
//     // Function to extract URL parameter by name
//     const getUrlParameter = (name, url) => {
//       url = window.location.href;
//       console.log(url);
//       const userId = url.split("userId=")[1];
//       console.log(userId);
//     };

//     // Get userId parameter from the URL
//     // const userId = getUrlParameter('userId');

//     // Store userId in local storage
//     // localStorage.setItem("userId", userId);
//   }, []);
//   return (
//     <div>
//       <Navbar />

//       {/* <LoginUser /> */}
//       <Hero />
//       <Category />
//       <div className="flex justify-center items-center mx-0 my-0 mt-3">
//         <div className=" w-4/5 ">
//           <Recommend />
//         </div>
//       </div>

//       <FeatureSection />
//       <Footer />
//       {cartShow && <CartContainer />}
//     </div>
//   );
// };

// export default Home;

const Home = () => {
  const [{ cartShow }, dispatch] = useStateValue();
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    // Function to extract URL parameter by name
    const getUrlParameter = (name, url) => {
      if (!url) url = window.location.href;
      const params = new URLSearchParams(new URL(url).search);
      return params.get(name);
    };

    // Get userId parameter from the URL
    const userId = getUrlParameter("userId");

    // Log current URL and extracted userId
    // console.log("Current URL:", window.location.href);
    // console.log("Extracted userId:", userId);

    // Store userId in local storage
    localStorage.setItem("userId", []);
    let cleanUserId = userId && userId.replace(/\/\?status=Completed$/, "");
    localStorage.setItem("userId", cleanUserId);
    // localStorage.setItem("userId", userId);
  }, []);

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
    </div>
  );
};

export default Home;
