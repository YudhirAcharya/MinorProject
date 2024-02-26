// import React from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import FeatureSection from "../components/FeatureSection";
import RecommendDum from "../components/RecommendDum";
import AfterSelectionProducts from "../components/AfterSelectionProducts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import CartContainer from "./CartContainer";
import { useEffect, useState } from "react";

import { useStateValue } from "../context/StateProvider";
import Cookies from "js-cookie";
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
const currentUser_id = localStorage.getItem("userId");
// const currentUser_id = "u_1oKVZvcir01Ja6U1XIczcrh8mbP";
console.log(currentUser_id);
const apiUrl = "http://127.0.0.1:3001/users/recommendationData";

const Home = () => {
  const [{ cartShow }, dispatch] = useStateValue();

  let [userExists, setUserExists] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let array = data.data.rows;

        let userExistsInData = data.data.rows.find((row) => {
          return row.user_id.includes(currentUser_id);
        });
        console.log(userExistsInData);
        setUserExists(userExistsInData);
      } catch (error) {
        console.error("Error fetching recommendation data:", error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   // Function to extract URL parameter by name
  //   const getUrlParameter = (name, url) => {
  //     if (!url) url = window.location.href;
  //     const params = new URLSearchParams(
  //       new URL(url).search
  //     );
  //     return params.get(name);
  //   };

  //   // Get userId parameter from the URL
  //   const userId = getUrlParameter("userId");

  //   // Log current URL and extracted userId
  //   // console.log("Current URL:", window.location.href);
  //   // console.log("Extracted userId:", userId);

  //   // Store userId in local storage
  //   localStorage.setItem("userId", []);
  //   let cleanUserId =
  //     userId && userId.replace(/\/\?status=Completed$/, "");
  //   localStorage.setItem("userId", cleanUserId);
  //   // localStorage.setItem("userId", userId);
  // }, []);
  // console.log(userExists);

  return (
    <div>
      <Navbar />
      {/*<Hero />
      <Category />*/}
      {userExists ? (
        <RecommendDum user_id={currentUser_id} />
      ) : (
        <AfterSelectionProducts />
      )}
      <FeatureSection />
      <Footer />
      {cartShow && <CartContainer />}
    </div>
  );
};

export default Home;
