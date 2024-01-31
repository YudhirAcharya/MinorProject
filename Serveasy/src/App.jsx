import "./App.css";
import About from "./pages/About";
import Account from "./pages/Account";
import Error from "./pages/Error";
import React, { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signing from "./pages/Signing";
import donuts from "./animations/donuts.json";
import Lottie from "lottie-react";
// import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import SignIn from "./pages/SignIn";
// import Signup from "./pages/Signup";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen max-w-100 max-h-100">
          <Lottie animationData={donuts} loop={true} />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/signing" element={<Signing />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;

//route index to tell it's starting page
