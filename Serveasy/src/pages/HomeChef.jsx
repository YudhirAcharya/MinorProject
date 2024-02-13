import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import RecommendMulti from "../components/RecommendMulti";

const HomeChef = () => {
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/chef/ordersChef"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.message
        );
      }
    };

    fetchOrders();
  }, []);

  const [toggleOrder, setToggleOrder] = useState(false);

  const handleToggle = () => {
    setToggleOrder(!toggleOrder);
  };
  //127.0.0.1:3001/chef/ordersChef

  return (
    <div>
      <Navbar />
      Home Chef
      <RecommendMulti />
      <div>
        <h1>Orders for Chef</h1>
        <ul>
          {data.map((order) => (
            <li key={order.id}>{order.name}</li>
            // Adjust the code based on the structure of your data
          ))}
        </ul>
      </div>
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
