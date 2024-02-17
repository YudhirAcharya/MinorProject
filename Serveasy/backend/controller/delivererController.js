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
              status: "error",
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
                    res.status(201).json({ status: "success" });
                  } else {
                    // console.log(err);
                    res.json({
                      status: "failure",
                      error: err,
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
              res.json({ status: "success" });
            } else {
              return res
                .status(401)
                .json({ status: "error", error: "Incorrect Password" });
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

// exports.getOrders = (req, res) => {
//   const pool = req.pool;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     // console.log(`connected as id ${connection.threadId}`);

//     connection.query("Select * from delivery where status=0", (err, rows) => {
//       connection.release();

//       if (!err) {
//         res.status(200).json({
//           status: "success",
//           results: rows.length,
//           data: {
//             rows,
//           },
//           // data,
//         });
//       } else {
//         console.log(err);
//       }

//       connection.query("Select phone_number from user where user_id = ?");
//     });
//   });
// };

exports.getOrders = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "SELECT d.*, u.phone_number FROM delivery d INNER JOIN user u ON d.user_id = u.user_id WHERE d.status = 0",
      (err, rows) => {
        connection.release();
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        }

        res.status(200).json({
          status: "success",
          results: rows.length,
          data: {
            orders: rows,
          },
        });
      },
    );
  });
};

exports.updateAndMoveToRecommendationAndChangeStatus = (req, res) => {
  const pool = req.pool;
  const deliveryData = req.body;

  let duplicateError = false;
  let processedOrders = 0;

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting database connection:", err);
      return res
        .status(500)
        .json({ status: "error", error: "Internal Server Error" });
    }

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        console.error("Error starting transaction:", err);
        return res
          .status(500)
          .json({ status: "error", error: "Transaction start failed" });
      }

      const deliveredDeliveryIds = deliveryData
        .filter((item) => item.status === 1)
        .map((item) => item.delivery_id);

      if (deliveredDeliveryIds.length === 0) {
        connection.rollback(() => {
          connection.release();
          return res.status(200).json({
            status: "success",
            message: "No deliveries with status = 1",
          });
        });
      }

      const updateDeliveredCountSQL = `
        UPDATE orders o
        SET o.delivered_count = o.delivered_count + 1
        WHERE o.orders_id IN (
            SELECT oi.orders_id
            FROM ordered_items oi
            WHERE oi.order_id IN (
                SELECT d.order_id
                FROM delivery d
                WHERE d.delivery_id = ?
            )
        )`;

      const updateOverallStatusSQL = `
        UPDATE orders o
        SET o.overall_status = 1
        WHERE o.delivered_count = o.num_of_foods`;

      const insertRecommendationSQL = `
        INSERT INTO dummy_recommendation(delivered_id, orderID, recipeID, recipe_name, user_id, user_name)
        VALUES (?, ?, ?, ?, ?, ?)`;

      deliveredDeliveryIds.forEach((deliveryId) => {
        connection.query(
          updateDeliveredCountSQL,
          [deliveryId],
          (err, results) => {
            if (err) {
              console.error("Error updating delivered count:", err);
              connection.rollback(() => {
                connection.release();
                return res.status(500).json({
                  status: "error",
                  error: "Updating delivered count failed",
                });
              });
            }

            connection.query(updateOverallStatusSQL, (err, results) => {
              if (err) {
                console.error("Error updating overall status:", err);
                connection.rollback(() => {
                  connection.release();
                  return res.status(500).json({
                    status: "error",
                    error: "Updating overall status failed",
                  });
                });
              }

              deliveryData.forEach((delivery) => {
                const { delivery_id: sentDeliveryId, status } = delivery;
                if (status === 1 && sentDeliveryId === deliveryId) {
                  connection.query(
                    "UPDATE delivery SET status=1 WHERE delivery_id=?",
                    [sentDeliveryId],
                    (err, result) => {
                      if (err) {
                        return connection.rollback(() => {
                          connection.release();
                          console.error("Error updating delivery status:", err);
                          return res.status(500).json({
                            status: "error",
                            error: "Updating delivery status failed",
                          });
                        });
                      }

                      connection.query(
                        "SELECT order_id FROM delivery WHERE delivery_id=?",
                        [sentDeliveryId],
                        (err, orderResult) => {
                          if (err) {
                            return connection.rollback(() => {
                              connection.release();
                              console.error("Error retrieving order ID:", err);
                              return res.status(500).json({
                                status: "error",
                                error: "Retrieving order ID failed",
                              });
                            });
                          }

                          const orderId = orderResult[0].order_id;

                          connection.query(
                            "UPDATE ordered_items SET d_status=1 WHERE order_id=?",
                            [orderId],
                            (err, result) => {
                              if (err) {
                                return connection.rollback(() => {
                                  connection.release();
                                  console.error(
                                    "Error updating delivery status in ordered_items:",
                                    err,
                                  );
                                  return res.status(500).json({
                                    status: "error",
                                    error:
                                      "Updating delivery status in ordered_items failed",
                                  });
                                });
                              }

                              connection.query(
                                "SELECT order_id, user_id, food_name FROM ordered_items WHERE order_id=? AND c_status=1 AND d_status=1",
                                [orderId],
                                (err, items) => {
                                  if (err) {
                                    return connection.rollback(() => {
                                      connection.release();
                                      console.error(
                                        "Error retrieving order details:",
                                        err,
                                      );
                                      return res.status(500).json({
                                        status: "error",
                                        error:
                                          "Retrieving order details failed",
                                      });
                                    });
                                  }

                                  items.forEach((item) => {
                                    const { order_id, user_id, food_name } =
                                      item;
                                    connection.query(
                                      "SELECT user_name FROM user WHERE user_id=?",
                                      [user_id],
                                      (err, userNameResult) => {
                                        if (err) {
                                          return connection.rollback(() => {
                                            connection.release();
                                            console.error(
                                              "Error retrieving user name:",
                                              err,
                                            );
                                            return res.status(500).json({
                                              status: "error",
                                              error:
                                                "Retrieving user name failed",
                                            });
                                          });
                                        }

                                        const userName =
                                          userNameResult[0].user_name;

                                        connection.query(
                                          "SELECT FoodID FROM food WHERE TranslatedRecipeName = ?",
                                          [food_name],
                                          (err, foodIDResult) => {
                                            if (err) {
                                              return connection.rollback(() => {
                                                connection.release();
                                                console.error(
                                                  "Error retrieving food ID:",
                                                  err,
                                                );
                                                return res.status(500).json({
                                                  status: "error",
                                                  error:
                                                    "Retrieving food ID failed",
                                                });
                                              });
                                            }

                                            const foodID =
                                              foodIDResult[0].FoodID;

                                            connection.query(
                                              insertRecommendationSQL,
                                              [
                                                sentDeliveryId,
                                                order_id,
                                                foodID,
                                                food_name,
                                                user_id,
                                                userName,
                                              ],
                                              (err, finalresult) => {
                                                if (err) {
                                                  if (
                                                    err.code === "ER_DUP_ENTRY"
                                                  ) {
                                                    console.error(
                                                      "Duplicate entry error:",
                                                      err,
                                                    );
                                                    duplicateError = true;
                                                  } else {
                                                    console.error(
                                                      "Error inserting into Recommendation_Data table:",
                                                      err,
                                                    );
                                                  }
                                                } else {
                                                  console.log(
                                                    "Inserted into dummy_recommendation table",
                                                  );
                                                }

                                                processedOrders++;

                                                if (
                                                  processedOrders ===
                                                  items.length
                                                ) {
                                                  if (duplicateError) {
                                                    connection.rollback(() => {
                                                      connection.release();
                                                      return res
                                                        .status(400)
                                                        .json({
                                                          status: "error",
                                                          error:
                                                            "Duplicate entry. Data already exists.",
                                                        });
                                                    });
                                                  } else {
                                                    connection.commit((err) => {
                                                      if (err) {
                                                        return connection.rollback(
                                                          () => {
                                                            connection.release();
                                                            console.error(
                                                              "Error committing transaction:",
                                                              err,
                                                            );
                                                            return res
                                                              .status(500)
                                                              .json({
                                                                status: "error",
                                                                error:
                                                                  "Transaction commit failed",
                                                              });
                                                          },
                                                        );
                                                      }

                                                      connection.release();
                                                      return res
                                                        .status(200)
                                                        .json({
                                                          status: "success",
                                                          message:
                                                            "Recommendation data inserted successfully",
                                                        });
                                                    });
                                                  }
                                                }
                                              },
                                            );
                                          },
                                        );
                                      },
                                    );
                                  });
                                },
                              );
                            },
                          );
                        },
                      );
                    },
                  );
                }
              });
            });
          },
        );
      });
    });
  });
};

exports.updateDeliveredCount = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting connection from pool:", err);
      return res.status(500).send("Internal Server Error");
    }

    // Extract delivery data from the request body
    const deliveryData = req.body;

    // Extract delivery IDs with status = 1
    const deliveredDeliveryIds = deliveryData
      .filter((item) => item.status === 1)
      .map((item) => item.delivery_id);

    if (deliveredDeliveryIds.length === 0) {
      // No deliveries with status = 1, return without updating
      connection.release();
      return res.status(200).send("No deliveries with status = 1");
    }

    // Construct SQL query to update delivered count in orders table for each delivery ID
    const sql = `
      UPDATE orders o
      SET o.delivered_count = o.delivered_count + 1
      WHERE o.orders_id IN (
          SELECT oi.orders_id
          FROM ordered_items oi
          WHERE oi.order_id IN (
              SELECT d.order_id
              FROM delivery d
              WHERE d.delivery_id = ?
          )
      )`;

    // Execute the query for each delivered delivery ID
    deliveredDeliveryIds.forEach((deliveryId) => {
      connection.query(sql, [deliveryId], (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          connection.release();
          return res.status(500).send("Internal Server Error");
        }
      });
    });

    // Release the connection back to the pool after all queries are executed
    connection.release();
    res.status(200).send("Delivered count updated successfully");
  });
};
