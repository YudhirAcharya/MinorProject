/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const comparePassword = require("./../utils/comparePassword");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, email) => {
  return jwt.sign(
    { id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET_USER,
    {
      expiresIn: maxAge,
    },
  );
};

// Insert a user
exports.registerUser = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const {
      user_id,
      user_name,
      full_name,
      email,
      password: Npassword,
      phone_number,
    } = req.body; // Destructure user_id and Name from req.body
    if (!email || !Npassword)
      return res.json({
        status: "error",
        error: "Please enter your email and password",
      });
    else {
      connection.query(
        "SELECT email FROM user WHERE email=?",
        [email],
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
                "INSERT INTO user (user_id, user_name,full_name,email, password,phone_number) VALUES (?, ?, ?, ?,?,?)",
                [user_id, user_name, full_name, email, password, phone_number],
                (err, rows) => {
                  connection.release();
                  const token = createToken(user_id, email);
                  if (!err) {
                    res.cookie("jwt", token, {
                      httpOnly: true,
                      maxAge: maxAge * 1000,
                    });
                    res
                      .status(201)
                      .json({ status: "success", user_id: user_id });
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
exports.loginUser = (req, res) => {
  const { email, password: checkPassword } = req.body;
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT user_id,email,password FROM user WHERE email=?",
      [email],
      async (err, result) => {
        connection.release();
        if (err) {
          // Handle the error
          console.log("Error retrieving user:", err);
          return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
        }
        if (result.length === 0) {
          // If user not found, send appropriate response
          return res
            .status(404)
            .json({ status: "error", error: "User not found" });
        }
        if (result.length === 1) {
          const storedPassword = result[0].password;
          const storedEmail = result[0].email;
          const stored_user_id = result[0].user_id;
          // console.log(user_id);
          try {
            const passwordsMatch = await comparePassword(
              checkPassword,
              storedPassword,
            );
            if (passwordsMatch) {
              const token = createToken(stored_user_id, email);
              res.cookie("jwt", token, {
                // domain: "localhost",
                sameSite: "none",
                maxAge: maxAge * 1000,
              });
              res.json({ status: "success", user_id: stored_user_id });
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

exports.logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  // res.redirect("/");
  res.status(200).json({ success: "Redirecting to Landing Page" });
};
exports.redirectUserHome = (req, res) => {
  //res.redirect("http://localhost:5173/home"); // Redirect to the home page
  res.status(200).json({ success: "Redirecting to User Home Page" });
};

exports.registerOrder = (req, res) => {
  const pool = req.pool;
  const { orders_id, user_id, created_at, num_of_foods, foods } = req.body; // Destructure order_id, user_id, and foods array from req.body

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to connect to database" });
      return;
    }

    // Begin a transaction
    connection.beginTransaction((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to begin transaction" });
        return;
      }

      // Insert into orders table
      connection.query(
        "INSERT INTO orders (orders_id, user_id, created_at, num_of_foods) VALUES (?, ?, ?, ?)",
        [orders_id, user_id, created_at, num_of_foods],
        (err, orderResult) => {
          if (err) {
            connection.rollback(() => {
              console.error(err);
              res.status(500).json({ error: "Failed to register the order" });
            });
            return;
          }

          // Insert into ordered_items table
          let insertCount = 0;
          foods.forEach(
            ({
              order_id,
              food_name,
              ingredients,
              amount,
              delivery_time,
              address,
            }) => {
              connection.query(
                "INSERT INTO ordered_items (order_id, food_name, ingredients, user_id, quantity, orders_id, delivery_time, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  order_id,
                  food_name,
                  ingredients,
                  user_id,
                  amount,
                  orders_id,
                  delivery_time,
                  address,
                ],
                (err) => {
                  if (err) {
                    connection.rollback(() => {
                      console.error(err);
                      res.status(500).json({
                        error: "Failed to register the ordered items",
                      });
                    });
                  } else {
                    insertCount++;
                    if (insertCount === foods.length) {
                      // All inserts successful
                      // Commit the transaction
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            console.error(err);
                            res
                              .status(500)
                              .json({ error: "Failed to commit transaction" });
                          });
                        } else {
                          connection.release();
                          res.status(201).json({
                            status: "success",
                            message: "Order registered successfully",
                          });
                        }
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
  });
};

exports.giveRecommendationData = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);

    connection.query("Select * from recommendation_data", (err, rows) => {
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

exports.getUserOrderInfo = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "SELECT *, UNIX_TIMESTAMP() * 1000 - created_at AS time_diff FROM recommendation_data WHERE user_id =?ORDER BY time_diff ASC LIMIT 0, 5",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      },
    );
  });
};

exports.PostAReviewAndRating = (req, res) => {
  const pool = req.pool;
  const { user_id, food_name, rating, review } = req.body;
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

      // Get the food_id based on the food_name from the ordered_items table
      connection.query(
        "SELECT FoodID FROM food WHERE TranslatedRecipeName = ?",
        [food_name],
        (err, results) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error while selecting from food",
            });
            return;
          }

          if (results.length === 0) {
            res.status(400).json({ error: "Food item not found" });
            return;
          }

          const food_id = results[0].FoodID;
          // console.log(food_id);

          // Check if the user has bought the food item
          connection.query(
            "SELECT * FROM ordered_items WHERE user_id = ? AND food_name = ?",
            [user_id, food_name],
            (err, results) => {
              if (err) {
                res
                  .status(500)
                  .json({ error: "Internal server error while selecting" });
                return;
              }

              if (results.length === 0) {
                res
                  .status(400)
                  .json({ error: "User has not purchased this food item" });
                return;
              }

              // Generate a random review_id
              const review_id = uuid.v4();
              // Insert the review into the database
              connection.query(
                "INSERT INTO rate_review (review_id, user_id, food_id, food_name, rating, review) VALUES (?, ?, ?, ?, ?, ?)",
                [review_id, user_id, food_id, food_name, rating, review],
                (err, result) => {
                  if (err) {
                    res
                      .status(500)
                      .json({ error: "Internal server error while inserting" });
                    console.log(err);
                    return;
                  }

                  res
                    .status(201)
                    .json({ message: "Review added successfully" });
                },
              );
            },
          );
        },
      );
    });
  });
};

exports.PostAReviewAndRating = (req, res) => {
  const pool = req.pool;
  const { user_id, food_name, rating, review } = req.body;

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

      // Get the food_id based on the food_name from the food table
      connection.query(
        "SELECT FoodID FROM food WHERE TranslatedRecipeName = ?",
        [food_name],
        (err, results) => {
          if (err) {
            connection.rollback(() => {
              connection.release();
              console.error("Error fetching food ID:", err);
              return res.status(500).json({ error: "Internal server error" });
            });
            return;
          }

          if (results.length === 0) {
            connection.rollback(() => {
              connection.release();
              res.status(400).json({ error: "Food item not found" });
            });
            return;
          }

          const food_id = results[0].FoodID;

          // Check if the user has bought the food item and if c_status and d_status are both 1
          connection.query(
            "SELECT * FROM ordered_items WHERE user_id = ? AND food_name = ? AND c_status = 1 AND d_status = 1",
            [user_id, food_name],
            (err, results) => {
              if (err) {
                connection.rollback(() => {
                  connection.release();
                  console.error("Error checking purchase:", err);
                  return res
                    .status(500)
                    .json({ error: "Internal server error" });
                });
                return;
              }

              if (results.length === 0) {
                connection.rollback(() => {
                  connection.release();
                  res.status(400).json({
                    error:
                      "User has not purchased or confirmed delivery of this food item",
                  });
                });
                return;
              }

              // Generate a random review_id
              const review_id = uuid.v4();

              // Insert the review into the rate_review table
              connection.query(
                "INSERT INTO rate_review (review_id, user_id, food_id, food_name, rating, review) VALUES (?, ?, ?, ?, ?, ?)",
                [review_id, user_id, food_id, food_name, rating, review],
                (err, result) => {
                  if (err) {
                    connection.rollback(() => {
                      connection.release();
                      console.error("Error inserting review:", err);
                      return res
                        .status(500)
                        .json({ error: "Internal server error" });
                    });
                    return;
                  }

                  // Update dummy_recommendation table if the record exists
                  connection.query(
                    "UPDATE dummy_recommendation SET stars = ?, text = ? WHERE user_id = ? AND recipeID= ?",
                    [rating, review, user_id, food_id],
                    (err, result) => {
                      if (err) {
                        connection.rollback(() => {
                          connection.release();
                          console.error(
                            "Error updating dummy_recommendation:",
                            err,
                          );
                          return res
                            .status(500)
                            .json({ error: "Internal server error" });
                        });
                        return;
                      }
                      // If no rows were affected, it means the record doesn't exist, do nothing
                      if (result.affectedRows === 0) {
                        // No existing record found, do nothing
                      }

                      // Commit the transaction
                      connection.commit((err) => {
                        if (err) {
                          connection.rollback(() => {
                            connection.release();
                            console.error("Error committing transaction:", err);
                            return res
                              .status(500)
                              .json({ error: "Internal server error" });
                          });
                          return;
                        }

                        // Release the connection after the transaction is completed
                        connection.release();
                        res
                          .status(201)
                          .json({ message: "Review added successfully" });
                      });
                    },
                  );
                },
              );
            },
          );
        },
      );
    });
  });
};

exports.getReviews = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "Select * from rate_review where food_id=?",
      [req.params.foodID],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      },
    );
  });
};

exports.getUserOrders = (req, res) => {
  const pool = req.pool;

  pool.getConnection((getConnectionErr, connection) => {
    if (getConnectionErr) {
      console.error("Error getting connection from pool:", getConnectionErr);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }

    connection.query(
      "SELECT o.orders_id, o.created_at, o.overall_status, oi.order_id, oi.food_name, f.imageurl, f.FoodID, oi.ingredients, oi.user_id, oi.quantity, oi.c_status, oi.d_status, oi.delivery_time, oi.address FROM orders AS o JOIN ordered_items AS oi ON o.orders_id = oi.orders_id JOIN food AS f ON oi.food_name = f.TranslatedRecipeName WHERE o.user_id = ?",
      [req.params.id],
      (queryErr, rows) => {
        connection.release();

        if (queryErr) {
          console.error("Error executing query:", queryErr);
          return res.status(500).json({
            status: "error",
            message: "Database query error",
          });
        }

        // Manipulating the data to create the desired structure
        const orders = {};
        rows.forEach((row) => {
          if (!orders[row.orders_id]) {
            // Initialize the orders object with the order details
            orders[row.orders_id] = {
              orders_id: row.orders_id,
              created_at: row.created_at,
              overall_status: row.overall_status,
              ordered_items: [], // Initialize ordered_items array
            };
          }

          // Add the ordered_item details to the ordered_items array
          orders[row.orders_id].ordered_items.push({
            order_id: row.order_id,
            food_name: row.food_name,
            FoodID: row.FoodID,
            imageurl: row.imageurl,
            ingredients: row.ingredients,
            user_id: row.user_id,
            quantity: row.quantity,
            c_status: row.c_status,
            d_status: row.d_status,
            delivery_time: row.delivery_time,
            address: row.address,
          });
        });

        res.status(200).json({
          status: "success",
          results: Object.keys(orders).length,
          data: orders,
        });
      },
    );
  });
};

exports.checkUser = (req, res) => {
  // check current user
  const { jwt: token } = req.body;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_USER,
      (err, decodedToken) => {
        if (err) throw err;
        res.json(decodedToken);
      },
    );
  }
};
