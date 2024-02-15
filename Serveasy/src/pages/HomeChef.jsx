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
      toggleOrder ? "Pending" : "Done",
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
        console.log("response:", response, "data:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchOrders();
  }, []);

  const [toggleOrder, setToggleOrder] = useState(false);

  const handleToggle = () => {
    setToggleOrder(true);
  };

  //127.0.0.1:3001/chef/ordersChef
  const handleDone = (itemId) => {
    // Filter out the item with the given ID from the orders array
    const updatedOrders = orders.filter((item) => item.id !== itemId);
    setOrders(updatedOrders);
  };
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">Food Orders</h2>
            <span className="text-xs text-gray-500">
              Following are the orders of different customers.
            </span>
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
          <div className="overflow-x-auto">
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
              <tbody className="text-gray-500">
                {orders.map((item) => {
                  <tr key={item.id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{item.quantity}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-full w-full rounded-full"
                            src=""
                            alt=""
                          />
                        </div>
                        <div className="ml-3">
                          <p className="whitespace-no-wrap">{item.user_id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{item.food_name}</p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">
                        {new Date(Date.now() + item.delivery_time * 60000)}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                        {toggleOrder ? (
                          <button
                            className="p-2 bg-red-300"
                            onClick={handleToggle}
                          >
                            Pending
                          </button>
                        ) : (
                          <button
                            className="p-2 bg-green-300"
                            onClick={() => handleDone(item.order_id)}
                          >
                            Done
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>;
                })}
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
