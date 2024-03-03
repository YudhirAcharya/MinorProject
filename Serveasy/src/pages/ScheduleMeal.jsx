import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCartContext } from "../context/cartContext";
import ScheduleItems from "../components/ScheduleItems";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
const ScheduleMeal = () => {
  const navigate = useNavigate();
  const { cart, totalAmount, deliveryFee } = useCartContext();
  const [confirm, setConfirm] = useState(false);
  const [orderData, setOrderData] = useState({
    orders_id: "",
    user_id: "",
    created_at: 0,
    num_of_foods: 0,
    foods: [],
  });
  // const [add, setAdd] = useState("");
  // const [dateTime, setDateTime] = useState(null);

  // const handleAddChange = (evt) => {
  //   setAdd(evt.target.value);
  // };

  // const handleDateTimeChange = (newValue) => {
  //   setDateTime(newValue.$d);
  // };
  const [cartItems, setCartItems] = useState(
    cart.map((item) => ({
      ...item,
      address: "",
      // scheduledDate: null,
    }))
  );

  const handleAddChange = (index, address) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item, i) =>
        i === index ? { ...item, address } : item
      )
    );
  };

  const handleDateTimeChange = (index, newValue) => {
    console.log(newValue);
    const milliseconds = dayjs(newValue).valueOf();
    milliseconds - Date.now() < 2 * 60 * 60 * 1000
      ? alert("Preparation time must be at least 2 hours")
      : setCartItems(
          (prevCartItems) =>
            prevCartItems.map((item, i) =>
              i === index ? { ...item, delivery_time: milliseconds } : item
            )
          // console.log(milliseconds)
        );
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setConfirm(!confirm);

    let userId = localStorage.getItem("userId");

    // Generate random orders_id using uuid
    const ordersId = `o_${uuid()}`;

    // Get current timestamp
    const createdAt = Date.now();

    // const newCart = cart.map((item) => {
    //   return {
    //     ...item,
    //     address: add,
    //     scheduled_date: dateTime,
    //   };
    // });
    const newCart = cartItems.map((item) => ({
      ...item,
      address: item.address,
      delivery_time: item.delivery_time,
    }));
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
    console.log(newOrderData);

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
  };
  const handlePayment = async (orderData, totalAmount, deliveryFee) => {
    console.log(orderData, totalAmount, deliveryFee);
    let userId = localStorage.getItem("userId");
    const payload = {
      return_url: `http://localhost:5173/user-home?userId=${userId}`,
      website_url: "http://localhost:3001",
      amount: (totalAmount + deliveryFee) * 10,
      purchase_order_id: orderData.orders_id,
      purchase_order_name: orderData.user_id,
      customer_info: {
        name: "...",
        email: " ",
        phone: " ",
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
      navigate(`/user-home?userId=${userId}`, {
        replace: true,
        state: { userId },
      });
    } else {
      navigate(`/user-home?userId=${userId}`, {
        replace: true,
        state: { userId },
      });
    }
  };
  return (
    <>
      <Navbar />
      <section className="h-screen w-full py-20 sm:py-20 lg:py-[8rem]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Schedule your meals
            </h1>
          </div>

          <div className="mx-auto mt-8 max-w-[80%] md:mt-12">
            <div className="bg-white">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8 h-[15rem] overflow-y-scroll example">
                    {/* {cart &&
                      cart.map((curEl) => (
                        <ScheduleItems
                          key={curEl.id}
                          {...curEl}
                          // add={add}
                          setAdd={setAdd}
                          // dateTime={dateTime}
                          setDateTime={setDateTime}
                          handleAddChange={handleAddChange}
                          handleDateTimeChange={handleDateTimeChange}
                        />
                      ))} */}
                    {cartItems &&
                      cartItems.map((curEl, index) => (
                        <ScheduleItems
                          key={curEl.id}
                          {...curEl}
                          index={index}
                          handleAddChange={(address) =>
                            handleAddChange(index, address)
                          }
                          handleDateTimeChange={(newValue) =>
                            handleDateTimeChange(index, newValue)
                          }
                        />
                      ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Rs.{totalAmount}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Delivery</p>
                    <p className="text-lg font-semibold text-gray-900">
                      Rs.{deliveryFee}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">
                      Rs.
                    </span>
                    {totalAmount + deliveryFee}
                  </p>
                </div>

                <div className="my-6 text-center">
                  {confirm ? (
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow "
                      onClick={() =>
                        handlePayment(orderData, totalAmount, deliveryFee)
                      }
                    >
                      Pay
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow "
                      onClick={handleConfirm}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ScheduleMeal;
