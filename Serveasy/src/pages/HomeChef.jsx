import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import RecommendMulti from "../components/RecommendMulti";
const HomeChef = () => {
  const [toggleOrder, setToggleOrder] = useState(false);

  const handleToggle = () => {
    setToggleOrder(!toggleOrder);
  };
  return (
    <div>
      <Navbar />
      Home Chef
      <RecommendMulti />
      <div className="m-6 ">
        <table className=" border ">
          <thead>
            <tr className="border">
              <th className=" border">Orders</th>
              <th className=" border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>momo</td>
              <td>
                <button
                  onClick={handleToggle}
                  className={`p-2 ${
                    toggleOrder
                      ? "bg-red-300"
                      : "bg-green-300"
                  }`}
                >
                  {toggleOrder ? "Pending" : "Done"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default HomeChef;
