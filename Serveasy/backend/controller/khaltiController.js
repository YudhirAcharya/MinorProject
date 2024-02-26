// /* eslint-disable no-undef */
// const { default: axios } = require("axios");

// exports.khaltiPayment = async (req, res) => {
//   try {
//     const payload = req.body;

//     // Making a POST request to Khalti's API endpoint
//     const khaltiResponse = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/initiate/",
//       payload,
//       {
//         headers: {
//           Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//         },
//       },
//     );

//     // Checking if there is a response from the Khalti API
//     if (khaltiResponse && khaltiResponse.data) {
//       // Sending a JSON response with success message and data
//       res.json({
//         success: true,
//         data: khaltiResponse.data,
//       });
//     } else {
//       // Sending a JSON response indicating that something went wrong
//       res.status(500).json({
//         success: false,
//         message: "Failed to initiate Khalti payment.",
//       });
//     }
//   } catch (error) {
//     // Handling errors
//     console.error("Error in Khalti payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while processing your request.",
//     });
//   }
// };

// /* eslint-disable no-undef */
// const fetch = require("node-fetch");

// exports.khaltiPayment = async (req, res) => {
//   try {
//     const payload = req.body;
//     // Making a POST request to Khalti's API endpoint
//     const khaltiResponse = await fetch(
//       "https://a.khalti.com/api/v2/epayment/initiate/",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
//         },
//         body: JSON.stringify(payload),
//       },
//     );

//     // Parsing the JSON response from Khalti API
//     const responseData = await khaltiResponse.json();

//     // Checking if there is a response from the Khalti API
//     if (khaltiResponse.ok) {
//       // Sending a JSON response with success message and data
//       res.json({
//         success: true,
//         data: responseData,
//       });
//     } else {
//       console.error("Error in Khalti payment:", error);
//       // Sending a JSON response indicating that something went wrong
//       res.status(500).json({
//         success: false,
//         message: "Failed to initiate Khalti payment.",
//       });
//     }
//   } catch (error) {
//     // Handling errors
//     console.error("Error in Khalti payment:", error);
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while processing your request.",
//     });
//   }
// };

/* eslint-disable no-undef */
const fetch = require("node-fetch");

exports.khaltiPayment = async (req, res) => {
  try {
    const payload = req.body;
    // Making a POST request to Khalti's API endpoint
    const khaltiResponse = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
        body: JSON.stringify(payload),
      },
    );

    // Parsing the JSON response from Khalti API
    const responseData = await khaltiResponse.json();

    // Checking if there is a response from the Khalti API
    if (khaltiResponse.ok) {
      // Sending a JSON response with success message and data
      res.json({
        success: true,
        data: responseData,
      });
    } else {
      console.error("Error in Khalti payment:", responseData);
      // Sending a JSON response indicating that something went wrong
      res.status(500).json({
        success: false,
        message: "Failed to initiate Khalti payment.",
      });
    }
  } catch (error) {
    // Handling errors
    console.error("Error in Khalti payment:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
    });
  }
};
