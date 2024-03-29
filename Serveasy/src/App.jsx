/* eslint-disable react/prop-types */
import "./App.css";

import Error from "./pages/Error";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Signing from "./pages/Signing";
import donuts from "./animations/donuts.json";
import Lottie from "lottie-react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Landing from "./pages/Landing";

import CartContainer from "./pages/CartContainer";
import HomeChef from "./pages/HomeChef";
import HomeDelivery from "./pages/HomeDelivery";
import LoginUser from "./pages/LoginUser";
import Checkout from "./pages/Checkout";
import ScheduleMeal from "./pages/ScheduleMeal";
import HomeUser from "./pages/HomeUser";
import ASPFilter from "./components/ASPFilter";
import ASPRecommend from "./components/ASPRecommend";
import OrderHistory from "./pages/OrderHistory";
import AccountSelection from "./pages/AccountSelection";
import AccountRegister from "./pages/AccountRegister";

function App() {
  const [loading, setLoading] = useState(true);
  const [cleanUserId, setCleanUserId] = useState("");
  useEffect(() => {
    const getUrlParameter = (name, url) => {
      if (!url) url = window.location.href;
      const params = new URLSearchParams(new URL(url).search);
      console.log(params);
      return params.get(name);
    };
    const userId = getUrlParameter("userId");
    console.log(userId);
    localStorage.setItem("userId", []);
    // let cleanUserId = userId && userId.replace(/\/\?status=Completed$/, "");
    let cleanUserId =
      userId && userId.includes("/?status=Completed")
        ? userId.replace("/?status=Completed", "")
        : userId;
    localStorage.setItem("userId", cleanUserId);
    console.log(userId);
    console.log(cleanUserId);
    setCleanUserId(cleanUserId);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1));
        setLoading(false);
      } catch (error) {
        console.error("Loading error:", error);
      }
    };
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 4000);
    fetchData();
  }, []);
  const id = localStorage.getItem("userId");
  console.log(id);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen max-w-100 max-h-100">
          <Lottie animationData={donuts} loop={true} />
          <div className="text-4xl text-center mt-4">Loading...</div>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <>
              <Route path="/" element={<Landing />}></Route>
              <Route
                path="/AccountSelection"
                element={<AccountSelection />}
              ></Route>
              <Route
                path="/AccountRegister"
                element={<AccountRegister />}
              ></Route>
            </>

            {id.includes("y1u8721usAdf232") ? (
              <>
                <Route path="/OrderHistory" element={<OrderHistory />}></Route>
                <Route path="/user-home" element={<Home />}></Route>

                <Route path="/userhome2" element={<HomeUser />}></Route>

                <Route path="/ASPFilter" element={<ASPFilter />} />
                <Route path="/ASPRecommend" element={<ASPRecommend />} />

                <Route path="/login-user" element={<LoginUser />}></Route>

                <Route path="/signing" element={<Signing />}></Route>

                <Route path="*" element={<Error />}></Route>
                <Route path="/product/:FoodID" element={<Product />}></Route>
                <Route
                  path="components/CartContainer"
                  element={<CartContainer />}
                ></Route>
                <Route path="/Checkout" element={<Checkout />}></Route>
                <Route path="/ScheduleMeal" element={<ScheduleMeal />}></Route>
                {/* <Route path="/Landing" element={<Landing />}></Route> */}
              </>
            ) : id.includes("asuafhba798osfijd") ? (
              <Route path="/chef-home" element={<HomeChef />}></Route>
            ) : id.includes("zsu872jaasjdnfnaso") ? (
              <Route path="/delivery-home" element={<HomeDelivery />}></Route>
            ) : (
              <>
                <Route path="/" element={<Landing />}></Route>
                <Route
                  path="/AccountSelection"
                  element={<AccountSelection />}
                ></Route>
                <Route
                  path="/AccountRegister"
                  element={<AccountRegister />}
                ></Route>
              </>
            )}
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
