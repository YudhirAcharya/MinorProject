import "./App.css";
import About from "./pages/About";
import Account from "./pages/Account";
import Error from "./pages/Error";
// import React from "react";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signing from "./pages/Signing";
// import Footer from "./components/Footer";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import SignIn from "./pages/SignIn";
// import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/account"
          element={<Account />}
        ></Route>
        <Route
          path="/signing"
          element={<Signing />}
        ></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//route index to tell it's starting page
