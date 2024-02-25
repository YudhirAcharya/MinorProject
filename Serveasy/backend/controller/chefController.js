/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const uuid = require("uuid");
require("dotenv").config();
const comparePassword = require("./../utils/comparePassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id, email) => {
  return jwt.sign(
    { id: id, email: email },
    process.env.ACCESS_TOKEN_SECRET_CHEF,
    {
      expiresIn: maxAge,
    },
  );
};

// Insert a user
exports.registerChef = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const {
      c_id,
      c_name,
      c_full_name,
      c_email,
      c_password: Npassword,
      c_phone_number,
    } = req.body; // Destructure user_id and Name from req.body
    if (!c_email || !Npassword)
      return res.json({
        status: "error",
        error: "Please enter your email and password",
      });
    else {
      connection.query(
        "SELECT c_email FROM chef WHERE c_email=?",
        [c_email],
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
                "INSERT INTO chef (c_id, c_name,c_full_name,c_email,c_password,c_phone_number) VALUES (?, ?, ?, ?,?,?)",
                [c_id, c_name, c_full_name, c_email, password, c_phone_number],
                (err, rows) => {
                  connection.release();
                  const token = createToken(c_id, c_email);
                  if (!err) {
                    res.cookie("jwt", token, {
                      httpOnly: true,
                      maxAge: maxAge * 1000,
                    });
                    res.status(201).json({ status: "success", user_id: c_id });
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
exports.loginChef = (req, res) => {
  const { c_email, c_password: checkPassword } = req.body;
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT c_id,c_email,c_password FROM chef WHERE c_email=?",
      [c_email],
      async (err, result) => {
        connection.release();
        if (err) {
          // Handle the error
          console.log("Error retrieving chef:", err);
          return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
        }
        if (result.length === 0) {
          // If user not found, send appropriate response
          return res
            .status(404)
            .json({ status: "error", error: "Chef not found" });
        }
        if (result.length === 1) {
          const storedPassword = result[0].c_password;
          const storedEmail = result[0].c_email;
          const stored_chef_id = result[0].c_id;
          // console.log(user_id);
          try {
            const passwordsMatch = await comparePassword(
              checkPassword,
              storedPassword,
            );
            if (passwordsMatch) {
              const token = createToken(stored_chef_id, storedEmail);
              res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
              });
              res.json({ status: "success", user_id: stored_chef_id });
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

exports.logoutChef = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  // res.redirect("/");
  res.redirect("http://localhost:5173/");
  // res.status(200).json({ success: "Redirecting to Landing Page" });
};
exports.redirectChefHome = (req, res) => {
  res.redirect("http://localhost:5173/chef-home"); // Redirect to the home page
  // res.status(200).json({ success: "Redirecting to Chef Home Page" });
};

exports.getOrdersChef = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "Select * from ordered_items where c_status=0 and d_status=0",
      (err, rows) => {
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
      },
    );
  });
};

exports.updateChefStatus = (req, res) => {
  const chefdata = req.body; // Assuming req.body is an array of objects containing order_id and c_status
  const pool = req.pool;
  chefdata.forEach((chefOrder) => {
    const { order_id, c_status } = chefOrder;
    if (c_status === 1) {
      pool.getConnection((err, connection) => {
        if (err) {
          console.log("Error getting database connection:", err);
          return res
            .status(500)
            .json({ status: "error", error: "Internal Server Error" });
        }

        // Update c_status in ordered_items table
        connection.query(
          "UPDATE ordered_items SET c_status=1 WHERE order_id=?",
          [order_id],
          (err, result) => {
            if (err) {
              connection.release();
              console.log("Error Updating Chef Status:", err);
              return res
                .status(500)
                .json({ status: "error", error: "Updating Database Failed" });
            }

            console.log(
              `Chef status updated successfully for order ${order_id}`,
            );

            // Generate a random delivery_id
            const delivery_id = uuid.v4();

            // Copy rows with c_status=1 to delivery table
            connection.query(
              `INSERT INTO delivery (delivery_id,order_id,food_name, quantity, user_id, address) SELECT ?,order_id,food_name, quantity, user_id, address FROM ordered_items WHERE order_id=? AND c_status=1`,
              [delivery_id, order_id],
              (err, insertResult) => {
                // connection.release();
                if (err) {
                  console.log("Error copying rows to delivery table:", err);
                  return res.status(500).json({
                    status: "error",
                    error: "Copying Rows to Delivery Table Failed",
                  });
                }

                console.log(
                  `Rows copied to delivery table for order ${order_id}`,
                );
              },
            );
          },
        );
      });
    }
  });
  res
    .status(200)
    .json({ status: "success", message: "Orders updated successfully" });
};
