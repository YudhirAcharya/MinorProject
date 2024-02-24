import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCloudDownloadAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import { NavLink } from "react-router-dom";
import "jspdf-autotable";
const HomeChef = () => {
  const [orders, setOrders] = useState([]);
  const [timers, setTimers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 7;
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    // Add table headers
    const headers = [["Quantity", "User Name", "Order", "Scheduled", "Status"]];
    const data = orders.map((order) => [
      order.quantity,
      order.user_id,
      order.food_name,
      new Date(Date.now() + order.delivery_time * 60000).toLocaleString(),
      orderStatus ? "Pending" : "Done",
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      styles: { halign: "left" },
      columnStyles: { 0: { halign: "right" } },
    });
    console.log(doc instanceof jsPDF);
    // Download the PDF file
    doc.save("orders.pdf");
    window.open(doc.output("bloburl"), "_blank");
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3001/chef/ordersChef", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      let datas = data.data.rows;
      console.log(data);
      datas.sort((a, b) => a.delivery_time - b.delivery_time);
      setOrders(datas);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const [orderStatus, setOrderStatus] = useState({});

  const handleToggle = (orderId) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: !prevStatus[orderId],
    }));
  };

  const handleDone = async (order_id) => {
    // Update the c_status property of the order with the given orderId
    const updatedOrders = orders.map((item) => {
      if (item.order_id === order_id) {
        return { ...item, c_status: 1 };
      }
      return item;
    });
    // Clear the interval for the completed order
    const intervalId = timers[order_id + "_intervalId"];
    clearInterval(intervalId);
    setTimers((prevTimers) => {
      const { [order_id + "_intervalId"]: _, ...rest } = prevTimers;
      return rest;
    });
    // Filter out the orders with c_status = 1 and update the state
    const visibleOrders = updatedOrders.filter((item) => item.c_status === 0);
    setOrders(visibleOrders);
    let newOrderData = [{ order_id, c_status: 1 }];
    try {
      // Make a POST request to the server to update the order status
      const response = await fetch("http://127.0.0.1:3001/chef/ordersChef", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrderData),
      });
      console.log(newOrderData);
      if (!response.ok) {
        throw new Error(
          `Failed to update order status: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.log(error.message);
      // Revert the state if the server update fails
      setOrders(updatedOrders);
    }
  };

  const [timer, setTimer] = useState("02:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (orderId, e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      const isTwoHoursBefore = total <= 2 * 60 * 60 * 1000;

      setTimers((prevTimers) => ({
        ...prevTimers,
        [orderId]: `${hours}:${minutes}:${seconds}`,
      }));

      if (isTwoHoursBefore) {
        const id = setInterval(() => {
          startTimer(orderId, e);
        }, 1000);

        setTimers((prevTimers) => ({
          ...prevTimers,
          [orderId + "_intervalId"]: id,
        }));
      }
    }
  };

  // const clearTimer = () => {
  //   orders.forEach((order) => {
  //     const isTwoHoursBefore =
  //       getTimeRemaining(new Date(order.delivery_time)).total <=
  //       2 * 60 * 60 * 1000;

  //     if (isTwoHoursBefore) {
  //       const id = setInterval(() => {
  //         startTimer(order.order_id, new Date(order.delivery_time));
  //       }, 1000);

  //       setTimers((prevTimers) => ({
  //         ...prevTimers,
  //         [order.order_id]: "02:00:00",
  //         [order.order_id + "_intervalId"]: id,
  //       }));
  //     }
  //   });
  // };
  const clearTimer = () => {
    console.log("clearTimer called");
    orders.forEach((order) => {
      const isTwoHoursBefore =
        getTimeRemaining(new Date(order.delivery_time)).total <=
        2 * 60 * 60 * 1000;

      if (isTwoHoursBefore) {
        const id = setInterval(() => {
          startTimer(order.order_id, new Date(order.delivery_time));
        }, 1000);

        setTimers((prevTimers) => ({
          ...prevTimers,
          [order.order_id]: "02:00:00",
          [order.order_id + "_intervalId"]: id,
        }));
        console.log(
          `Set timer for order ${order.order_id} with interval ${id}`
        );
      }
    });
  };

  const getDeadTime = () => {
    let deadline = new Date();
    // Set the deadline to 2 hour and 00 minutes from now
    deadline.setHours(deadline.getHours() + 2);
    deadline.setMinutes(deadline.getMinutes() + 0);
    return deadline;
  };
  const curTime = new Date();

  useEffect(() => {
    clearTimer();
  }, [orders]);
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Food Orders</h2>
            <span className="text-xs text-gray-500">
              Following are the orders of different customers.
            </span>
          </div>
          <NavLink
            to="/" // Replace "/" with your actual landing page path
            onClick={() => localStorage.clear()}
          >
            <button className="bg-red-800 text-white p-2 rounded-full">
              Logout
            </button>
          </NavLink>
          <div className="flex items-center justify-between">
            <div className="ml-10 space-x-8 lg:ml-40">
              <button
                className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:ring"
                onClick={generatePDF}
              >
                PDF <FaCloudDownloadAlt />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Quantity</th>
                  <th className="px-5 py-3">User Name</th>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Scheduled</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className=" overflow-y-auto ">
                {orders &&
                  orders
                    .slice(
                      (currentPage - 1) * ordersPerPage,
                      currentPage * ordersPerPage
                    )
                    .map((item) => {
                      const isTwoHoursBefore =
                        getTimeRemaining(item.delivery_time).total <=
                        2 * 60 * 60 * 1000;
                      return (
                        <tr key={item.id}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 ">
                            <p className="whitespace-no-wrap text-textColor font-normal text-[1rem]">
                              {item.quantity}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="whitespace-no-wrap text-textColor font-semibold text-[1rem]">
                                  {item.user_id}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 ">
                            <p className="whitespace-no-wrap text-textColor font-semibold text-[1rem]">
                              {item.food_name}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 ">
                            <p className="whitespace-no-wrap text-textColor font-semibold text-[1rem]">
                              {/* {curTime.getDay() * 24 * 60 +
                              curTime.getHours() * 60 +
                              curTime.getMinutes() +
                              item.delivery_time -
                              (new Date().getHours() * 60 +
                                new Date().getMinutes() +
                                new Date().getDay() * 24 * 60) >
                            30
                              ? item.delivery_time
                              : timer} */}
                              {/* {timer} */}
                              {/* {item.delivery_time} */}
                              {orderStatus[item.order_id] === undefined ||
                              orderStatus[item.order_id]
                                ? timers[item.order_id]
                                  ? timers[item.order_id]
                                  : new Date(
                                      item.delivery_time
                                    ).toLocaleString()
                                : "Done"}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 ">
                            {orderStatus[item.order_id] === undefined ||
                            orderStatus[item.order_id] ? (
                              <button
                                className="p-2 bg-red-400 text-white"
                                onClick={() => handleToggle(item.order_id)}
                              >
                                Pending
                              </button>
                            ) : (
                              <button
                                className="p-2 bg-green-400 text-white"
                                onClick={() => handleDone(item.order_id)}
                              >
                                Done
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              Showing {(currentPage - 1) * ordersPerPage + 1} to{" "}
              {Math.min(currentPage * ordersPerPage, orders.length)} of{" "}
              {orders.length} Entries
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button
                className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-textColor transition duration-150 hover:bg-primary"
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="h-12 w-12 rounded-full border text-sm font-semibold text-textColor transition duration-150 hover:bg-primary"
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(
                      prevPage + 1,
                      Math.ceil(orders.length / ordersPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(orders.length / ordersPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomeChef;
