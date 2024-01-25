import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<Home />}  />
    </Routes>
  );
}

export default App;

//route index to tell it's starting page
