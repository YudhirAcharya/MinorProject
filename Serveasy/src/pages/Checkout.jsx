// import React from "react";
import { v4 as uuid } from "uuid";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartContext";
import { IoMdClose } from "react-icons/io";
import CheckoutItems from "../components/CheckoutItems";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";
// dotenv.config();
const Checkout = () => {
  const { cart, totalAmount, deliveryFee } = useCartContext();
  const navigate = useNavigate();
  const [state, setState] = useState({
    add: "",
    city: "",
    province: "",
    country: "NP",
  });
  const [orderData, setOrderData] = useState({
    orders_id: "",
    user_id: "",
    created_at: 0,
    num_of_foods: 0,
    foods: [],
  });
  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };
  const [confirm, setConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state.add || !state.city || !state.province || !state.country) {
      alert("Please enter all data");
      return;
    }
    const { add, city, country, province } = state;
    const full_address = `${add},${city},${country},${province}`;

    setConfirm(!confirm);

    // Get user ID from logged-in user (replace with your method)
    let userId = localStorage.getItem("userId"); // Replace with your implementation

    // Generate random orders_id using uuid
    const ordersId = `o_${uuid()}`;

    // Get current timestamp
    const createdAt = Date.now();

    const newCart = cart.map((item) => {
      return {
        ...item,
        address: full_address,
        delivery_time: Date.now() + item.delivery_time * 60000,
      };
    });

    const foods = newCart;

    // Build the complete data object

    const newOrderData = {
      orders_id: ordersId,
      user_id: userId,
      created_at: createdAt,
      num_of_foods: foods.length,
      foods,
    };

    setOrderData(newOrderData);
    try {
      const response = await fetch(
        "http://127.0.0.1:3001/users/registerOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrderData),
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        navigate("/success");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Confirmation failed. Please try again later.");
    }

    console.log("Order data:", newOrderData);
  };

  const handlePayment = async (orderData, totalAmount, deliveryFee) => {
    console.log(orderData, totalAmount, deliveryFee);
    const payload = {
      return_url: `http://localhost:5173/user-home?userId=${orderData.user_id}`,
      website_url: "http://localhost:3001",
      amount: (totalAmount + deliveryFee) * 10,
      purchase_order_id: orderData.orders_id,
      purchase_order_name: orderData.user_id,
      customer_info: {
        name: "Ashim Upadhaya",
        email: "example@gmail.com",
        phone: "9811496763",
      },
    };

    const response = await axios.post(
      "http://localhost:3001/khalti-api",
      payload
    );
    console.log(response);
    if (response) {
      window.location.href = `${response?.data?.data?.payment_url}`;
    }
    if (response.status === 200 && response.data.success) {
      navigate("/success");
    }
  };

  return (
    <section>
      <Navbar />
      <div className="h-[95vh] grid grid-cols-2 p-4 rounded-md">
        <div className="lg:col-span-1 col-span-2 bg-lightColor space-y-4 px-6">
          <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
            <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
              <div className="text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 sm:w-5 h-6 sm:h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-sm font-medium ml-3">Checkout</div>
            </div>
            <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">
              Complete your delivery and payment details below.
            </div>
            <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
              <NavLink to="/user-home">
                <IoMdClose />
              </NavLink>
            </div>
          </div>
          <div className="rounded-md">
            <form id="payment-form" method="POST" onSubmit={handleSubmit}>
              <section className="w-full ">
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">
                  Delivery Information
                </h2>
                <fieldset className="mb-3 bg-white rounded text-gray-600">
                  <label className="flex  h-12 py-3 items-center">
                    <span className="text-right px-2">Address</span>
                    <input
                      name="add"
                      className="focus:outline-none px-3"
                      placeholder="Sanepa"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex h-12 py-3 items-center">
                    <span className="text-right px-2">City</span>
                    <input
                      name="city"
                      className="focus:outline-none px-3"
                      placeholder="Lalitpur"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex h-12 py-3 items-center">
                    <span className="text-right px-2">Province</span>
                    <input
                      name="province"
                      className="focus:outline-none px-3"
                      placeholder="Bagmati"
                      onChange={handleChange}
                    />
                  </label>

                  <label className="flex h-12 py-3 items-center select relative">
                    <span className="text-right px-2">Country</span>
                    <div
                      id="country"
                      className="focus:outline-none px-3 w-full flex items-center"
                    >
                      <select
                        name="country"
                        className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none"
                        onChange={handleChange}
                      >
                        <option value="NP">Nepal</option>
                        <option value="AU">Australia</option>
                        <option value="CA">Canada</option>
                        <option value="CN">China</option>
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                      </select>
                    </div>
                  </label>
                </fieldset>
              </section>
            </form>
          </div>
          <div className="rounded-md"></div>
          {confirm ? (
            <button
              className="submit-button px-4 py-3 rounded-full bg-primary text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
              onClick={() => handlePayment(orderData, totalAmount, deliveryFee)}
            >
              Pay Rs.{totalAmount + deliveryFee}
            </button>
          ) : (
            <button
              className="submit-button px-4 py-3 rounded-full bg-primary text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors"
              onClick={handleSubmit}
            >
              Confirm Location
            </button>
          )}
        </div>
        <div className="col-span-1 bg-white lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
            Order Summary
          </h1>
          <ul className="py-6 h-340 md:h-42 border-b space-y-6 px-8 overflow-y-scroll">
            {cart &&
              cart.map((curEl) => <CheckoutItems key={curEl.id} {...curEl} />)}
          </ul>
          <div className="px-8 border-b">
            <div className="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-primary">
                Rs.{totalAmount}
              </span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
              <span>Delivery Charge</span>
              <span className="font-semibold text-primary">
                Rs.{deliveryFee}
              </span>
            </div>
          </div>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>Rs.{totalAmount + deliveryFee}</span>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Checkout;
