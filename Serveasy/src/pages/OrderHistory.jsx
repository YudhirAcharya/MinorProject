import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  let user_id = localStorage.getItem("userId");
  // const user_id = "random";
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:3001/users/userOrders/${user_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to get orders history");
        }
        const data = await response.json();
        const ordersArray = [];

        for (const key in data.data) {
          ordersArray.push(data.data[key]);
        }
        console.log(ordersArray);
        setOrders(ordersArray);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, [user_id]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8 overflow-y-scroll example ">
          <div className="max-w-xl">
            <h1 className="text-2xl font-extrabold tracking-tight text-textColor sm:text-3xl">
              Order history
            </h1>
            <p className="mt-1 text-sm text-gray-500 font-normal">
              Check the status of recent orders, see if meals are prepared and
              delivered.
            </p>
            <NavLink
              to="/" // Replace "/" with your actual landing page path
              onClick={() => localStorage.clear()}
            >
              <button className="bg-red-800 text-white p-2 mt-4 rounded-full">
                Logout
              </button>
            </NavLink>
          </div>

          <section
            aria-labelledby="recent-heading"
            // className="overflow-y-scroll example "
          >
            <h2 id="recent-heading" className="sr-only">
              Recent orders
            </h2>

            {orders.map((order, i) => (
              <div className="my-[6rem]" key={i}>
                <div>
                  <h3 className="sr-only">
                    Order placed on{" "}
                    <time>{new Date(order.created_at).toDateString()}</time>
                  </h3>

                  <div className="bg-lightColor rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                    <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                      <div className="flex justify-between sm:block">
                        <dt className="font-medium text-gray-900">
                          Date placed
                        </dt>
                        <dd className="sm:mt-1">
                          <time
                            dateTime={new Date(order.created_at).toDateString()}
                          >
                            {new Date(order.created_at).toDateString()}
                          </time>
                        </dd>
                      </div>
                      <div className="flex justify-between pt-6 sm:block sm:pt-0">
                        <dt className="font-medium text-gray-900">Order ID</dt>
                        <dd className="sm:mt-1">{order.orders_id}</dd>
                      </div>
                      <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                        <dt>Overall Purchase Status</dt>
                        <dd className="sm:mt-1">
                          {order.overall_status ? (
                            <span className="text-green-600">Completed</span>
                          ) : (
                            <span className="text-red-600">Pending</span>
                          )}
                        </dd>
                      </div>
                    </dl>
                    {/* <a
                    href="#"
                    className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                  >
                    Download PDF
                    <span className="sr-only">for order {order.orders_id}</span>
                  </a> */}
                  </div>

                  <table className="mt-4 w-full text-gray-500 sm:mt-6">
                    <caption className="sr-only">Food</caption>
                    <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                      <tr>
                        <th
                          scope="col"
                          className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                        >
                          Food Items
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 pr-1 py-3 font-normal sm:table-cell"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                        >
                          Preparation Status
                        </th>
                        <th
                          scope="col"
                          className="hidden pr-8 py-3 font-normal sm:table-cell"
                        >
                          Delivery Status
                        </th>
                        <th
                          scope="col"
                          className="w-0 py-3 font-normal text-right"
                        >
                          Info
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                      {order.ordered_items.map((ord, i) => (
                        <tr key={i}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={ord.imageurl}
                                alt={ord.food_name}
                                className="w-16 h-16 object-center object-cover rounded mr-6"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {ord.food_name}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  {ord.quantity}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-1 sm:table-cell">
                            {ord.quantity}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {ord.c_status ? (
                              <span className="p-2 text-lightColor bg-green-400 rounded">
                                Prepared
                              </span>
                            ) : (
                              <span className="p-2 text-lightColor bg-red-400 rounded">
                                Preparing
                              </span>
                            )}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {ord.d_status ? (
                              <span className="p-2 text-lightColor bg-green-400 rounded">
                                Delivered
                              </span>
                            ) : (
                              <span className="p-2 text-lightColor bg-red-400 rounded">
                                On the way
                              </span>
                            )}
                          </td>
                          <td className="py-6 font-medium text-right whitespace-nowrap">
                            <NavLink to={`/Product/${ord.FoodID}`}>
                              <a href="#" className="text-primary">
                                View{" "}
                                <span className="hidden lg:inline">
                                  Product
                                </span>
                                <span className="sr-only">
                                  {order.food_name}
                                </span>
                              </a>
                            </NavLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
