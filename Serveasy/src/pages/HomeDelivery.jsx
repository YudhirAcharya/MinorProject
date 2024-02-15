// import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
// import { Link, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
const HomeDelivery = () => {
  const [toggleOrder, setToggleOrder] = useState(false);

  const handleToggle = () => {
    setToggleOrder(!toggleOrder);
  };
  return (
    <div>
      <Navbar />
      <div className="w-[screen]">
        <div className="mx-auto my-8 max-w-screen-lg px-2">
          <p className="font-semibold">Delivery: </p>
          <div className="sm:flex  sm:items-center sm:justify-between flex-col sm:flex-row">
            <div className="mt-6 overflow-hidden rounded-xl w-full">
              <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                <thead className="hidden border-b lg:table-header-group">
                  <tr className="border-[2px]">
                    <td
                      width="50%"
                      className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                    >
                      Delivery Address
                    </td>

                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Schedule
                    </td>

                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Quantity
                    </td>

                    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                      Status
                    </td>
                  </tr>
                </thead>

                <tbody className="lg:border-gray-300">
                  <tr className="">
                    <td
                      width="50%"
                      className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6"
                    >
                      Address
                      <div className="mt-1 lg:hidden">
                        <p className="font-normal text-gray-500">Address</p>
                      </div>
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      Date
                    </td>

                    <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                      Status
                      <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-red-200 py-1 px-2 text-left font-medium text-red-500 lg:hidden">
                        Canceled
                      </div>
                    </td>

                    <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <div className="inline-flex items-center rounded-full bg-red-200 py-1 px-2 text-red-500">
                        Canceled
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeDelivery;
