// import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";

const HomeDelivery = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:3001/deliverer/ordersDeliverer",
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        let datas = data.data.orders;
        console.log(data);
        datas.sort((a, b) => a.delivery_time - b.delivery_time);
        setOrders(datas);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchOrders();
  }, [orders]);

  const initialOrderStatus = orders.reduce((acc, item) => {
    acc[item.delivery_id] = true;
    return acc;
  }, {});

  const [orderStatus, setOrderStatus] = useState(initialOrderStatus);

  // const [orderStatus, setOrderStatus] = useState({});

  const handleToggle = (delivery_id) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [delivery_id]: !prevStatus[delivery_id],
    }));
  };

  const handleDone = async (delivery_id) => {
    // Update the c_status property of the order with the given orderId
    const updatedOrders = orders.map((item) => {
      if (item.delivery_id === delivery_id) {
        return { ...item, status: 1 };
      }
      return item;
    });

    // Filter out the orders with c_status = 1 and update the state
    const visibleOrders = updatedOrders.filter((item) => item.status === 0);
    setOrders(visibleOrders);
    let newOrderData = [{ delivery_id, status: 1 }];
    try {
      // Make a POST request to the server to update the order status
      const response = await fetch(
        "http://127.0.0.1:3001/deliverer/ordersDeliverer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOrderData),
        }
      );
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
  return (
    <div>
      <Navbar />
      <div className="w-[screen]  my-8">
        <div className=" grid grid-cols-1 items-center justify-between pb-6 mx-8">
          <div>
            <h2 className="text-gray-600 font-semibold">Delivery</h2>
            <span className="text-xs">All delivery requests</span>
          </div>

          <div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User Phone Number
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((item, index) => (
                        <tr key={index}>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-textColor whitespace-no-wrap font-normal text-[16px]">
                                  {item.phone_number}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white">
                            <p className="text-textColor whitespace-no-wrap font-normal text-[16px]">
                              {item.address}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white">
                            <p className="text-textColor whitespace-no-wrap font-normal text-[16px]">
                              {item.user_id}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white">
                            <p className="text-textColor whitespace-no-wrap font-normal text-[16px]">
                              {item.quantity}
                            </p>
                          </td>
                          <td className="px-5 py-3 border-b border-gray-200 bg-white font-normal text-[16px] text-white">
                            {orderStatus[item.delivery_id] === undefined ||
                            orderStatus[item.delivery_id] ? (
                              <button
                                className="p-2 bg-red-400 text-white"
                                onClick={() => handleToggle(item.delivery_id)}
                              >
                                Pending
                              </button>
                            ) : (
                              <button
                                className="p-2 bg-green-400 text-white"
                                onClick={() => handleDone(item.delivery_id)}
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
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
        <span className="text-xs xs:text-sm text-gray-900">
          Showing 1 to 4 of 50 Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
            Prev
          </button>
          &nbsp; &nbsp;
          <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeDelivery;
