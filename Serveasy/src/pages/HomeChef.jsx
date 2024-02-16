import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCloudDownloadAlt } from "react-icons/fa";
import jsPDF from "jspdf";
const HomeChef = () => {
  const [orders, setOrders] = useState([]);
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

    // Download the PDF file
    doc.save("orders.pdf");
  };
  useEffect(() => {
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
    fetchOrders();
  }, [orders]);

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

  // Timer:
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  // const Ref = useRef(null);

  // // The state for our timer
  // const [timer, setTimer] = useState("00:30:00");

  // const getTimeRemaining = (e) => {
  //   const total = Date.parse(e) - Date.parse(new Date());
  //   const seconds = Math.floor((total / 1000) % 60);
  //   const minutes = Math.floor((total / 1000 / 60) % 60);
  //   const hours = Math.floor((total / 1000 / 60 / 60) % 24);

  //   return {
  //     total,
  //     hours,
  //     minutes,
  //     seconds,
  //   };
  // };

  // const startTimer = (e) => {
  //   let { total, hours, minutes, seconds } = getTimeRemaining(e);
  //   if (total >= 0) {
  //     // update the timer
  //     // check if less than 10 then we need to
  //     // add '0' at the beginning of the variable
  //     setTimer(
  //       (hours > 9 ? hours : "0" + hours) +
  //         ":" +
  //         (minutes > 9 ? minutes : "0" + minutes) +
  //         ":" +
  //         (seconds > 9 ? seconds : "0" + seconds)
  //     );
  //   }
  // };

  // const clearTimer = (e) => {
  //   // If you adjust it you should also need to
  //   // adjust the Endtime formula we are about
  //   // to code next
  //   setTimer("00:30:00");

  //   // If you try to remove this line the
  //   // updating of timer Variable will be
  //   // after 1000ms or 1sec
  //   if (Ref.current) clearInterval(Ref.current);

  //   const id = setInterval(() => {
  //     startTimer(e);
  //   }, 1000);

  //   Ref.current = id;
  // };

  // const getDeadTime = () => {
  //   let deadline = new Date();
  //   // Set the deadline to 1 hour and 30 minutes from now
  //   deadline.setHours(deadline.getHours() + 0);
  //   deadline.setMinutes(deadline.getMinutes() + 30);
  //   return deadline;
  // };
  // const curTime = new Date();

  // // We can use useEffect so that when the component
  // // mount the timer will start as soon as possible
  // // We put empty array to act as componentDid
  // // mount only
  // useEffect(() => {
  //   clearTimer(getDeadTime());
  // }, []);

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
          <div>
            <button className="bg-red-800 p-2 text-white">Logout</button>
          </div>
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
                    .filter((_, i) => i < 10)
                    .map((item) => (
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
                    ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              Showing 1 to 5 of 12 Entries
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
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
