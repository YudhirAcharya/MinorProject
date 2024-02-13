/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const comparePassword = require("./../utils/comparePassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, email) => {
  return jwt.sign(
    { id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET_DELIVERER,
    {
      expiresIn: maxAge,
    },
  );
};

// Insert a user
exports.registerDeliverer = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const {
      d_id,
      d_name,
      d_full_name,
      d_email,
      d_password: Npassword,
      d_phone_number,
    } = req.body; // Destructure user_id and Name from req.body
    if (!d_email || !Npassword)
      return res.json({
        status: "error",
        error: "Please enter your email and password",
      });
    else {
      connection.query(
        "SELECT d_email FROM deliverer WHERE d_email=?",
        [d_email],
        (err, result) => {
          // connection.release();
          if (err) throw err;
          if (result && result.length > 0)
            // Check if email already exists
            return res.json({
              status: "failure",
              error: "Email has already been registered",
            });
          else {
            // Hash the password using bcrypt
            bcrypt.hash(Npassword, 8, (err, password) => {
              if (err) throw err;
              // Insert user into the database
              connection.query(
                "INSERT INTO deliverer (d_id, d_name,d_full_name,d_email,d_password,d_phone_number) VALUES (?, ?, ?, ?,?,?)",
                [d_id, d_name, d_full_name, d_email, password, d_phone_number],
                (err, rows) => {
                  connection.release();
                  const token = createToken(d_id, d_email);
                  if (!err) {
                    res.cookie("jwt", token, {
                      httpOnly: true,
                      maxAge: maxAge * 1000,
                    });
                    res
                      .status(201)
                      .json({ Deliverer_id: d_id, Deliverer_email: d_email });
                  } else {
                    console.log(err);
                    res.json({
                      status: "failure",
                      error: "Failed to register Deliverer",
                    });
                  }
                },
              );
            });
          }
        },
      );
    }
  });
};
exports.loginDeliverer = (req, res) => {
  const { d_email, d_password: checkPassword } = req.body;
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT d_id,d_email,d_password FROM deliverer WHERE d_email=?",
      [d_email],
      async (err, result) => {
        connection.release();
        if (err) {
          // Handle the error
          console.log("Error retrieving Deliverer:", err);
          return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
        }
        if (result.length === 0) {
          // If user not found, send appropriate response
          return res
            .status(404)
            .json({ status: "error", error: "Deliverer not found" });
        }
        if (result.length === 1) {
          const storedPassword = result[0].d_password;
          const storedEmail = result[0].d_email;
          const stored_Deliverer_id = result[0].d_id;
          // console.log(user_id);
          try {
            const passwordsMatch = await comparePassword(
              checkPassword,
              storedPassword,
            );
            if (passwordsMatch) {
              const token = createToken(stored_Deliverer_id, storedEmail);
              res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
              });
              res.status(201).json({
                Deliverer_id: stored_Deliverer_id,
                email: storedEmail,
              });
            } else {
              return res
                .status(401)
                .json({ status: "failure", failure: "Incorrect Password" });
            }
          } catch (error) {
            console.error("Error comparing passwords:", error);
            return res
              .status(500)
              .json({ status: "error", error: "Internal Server Error" });
          }
        }
      },
    );
  });
};

exports.logoutDeliverer = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  // res.redirect("/");
  res.status(200).json({ success: "Redirecting to Landing Page" });
};
exports.redirectDelivererHome = (req, res) => {
  //res.redirect("http://localhost:5173/home"); // Redirect to the home page
  res.status(200).json({ success: "Redirecting to Deliverer Home Page" });
};
exports.getOrders = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);

    connection.query("Select * from delivery", (err, rows) => {
      connection.release();

      if (!err) {
        res.status(200).json({
          status: "success",
          results: rows.length,
          data: {
            rows,
          },
          // data,
        });
      } else {
        console.log(err);
      }
    });
  });
};

exports.updateOrderStatus = (req, res) => {
  const deliveryData = req.body; // Assuming req.body is an array of objects containing delivery_id and status
  const pool = req.pool;

  deliveryData.forEach((delivery) => {
    const { delivery_id: sentDeliveryId, status } = delivery;
    if (status === 1) {
      pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error getting database connection:", err);
          return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
        }

        connection.query(
          "UPDATE delivery SET status=1 WHERE delivery_id=?",
          [sentDeliveryId],
          (err, result) => {
            if (err) {
              connection.release();
              console.log("Error Updating Delivery Status:", err);
              return res
                .status(500)
                .json({ status: "error", error: "Updating Database Failed" });
            }

            console.log(
              `Delivery ${sentDeliveryId} status updated successfully`,
            );

            // Retrieve the order_id associated with the sentDeliveryId
            connection.query(
              "SELECT order_id FROM delivery WHERE delivery_id=?",
              [sentDeliveryId],
              (err, orderResult) => {
                if (err) {
                  connection.release();
                  console.log("Error Retrieving Order ID:", err);
                  return res.status(500).json({
                    status: "error",
                    error: "Retrieving Order ID Failed",
                  });
                }

                const orderId = orderResult[0].order_id;

                // Update d_status in ordered_items table based on the retrieved order_id
                connection.query(
                  "UPDATE ordered_items SET d_status=1 WHERE order_id=?",
                  [orderId],
                  (err, result) => {
                    connection.release();
                    if (err) {
                      console.log(
                        "Error Updating Delivery Status in ordered_items:",
                        err,
                      );
                      return res.status(500).json({
                        status: "error",
                        error: "Updating Database Failed",
                      });
                    }

                    console.log(
                      `Delivery ${sentDeliveryId} status updated successfully in ordered_items`,
                    );
                  },
                );
              },
            );
          },
        );
      });
    }
  });
};
// [
//   { "delivery_id": 1, "status": 1 },
//   { "delivery_id": 2, "status": 0 },
//   { "delivery_id": 3, "status": 1 }
// ]
