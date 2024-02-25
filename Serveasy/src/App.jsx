/* eslint-disable react/prop-types */
import "./App.css";
// import About from "./pages/About";

import Error from "./pages/Error";
import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signing from "./pages/Signing";
import donuts from "./animations/donuts.json";
import Lottie from "lottie-react";
// import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Product from "./pages/Product";
import Landing from "./pages/Landing";
// import HomeChef from "./pages/HomeChef";
// import HomeDelivery from "./pages/HomeDelivery";
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
// import SignIn from "./pages/SignIn";
// import Signup from "./pages/Signup";

// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducer/authReducer"; // Import your authentication reducer
// import PrivateRoute from "./utils/PrivateRoute";
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
function App() {
  const [loading, setLoading] = useState(true);
  const [cleanUserId, setCleanUserId] = useState("");
  // const navigate = useNavigate();
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
    let cleanUserId = userId && userId.replace(/\/\?status=Completed$/, "");
    localStorage.setItem("userId", cleanUserId);
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

            {id.includes("9") ? (
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
