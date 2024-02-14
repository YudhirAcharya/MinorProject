/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_USER,
      (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.redirect("http://127.0.0.1:3001/users/userLogin");
          // res.json({ error: "Redirect to user login page" });
          // console.log("Redirect to login page");
        } else {
          console.log(decodedToken);
          next();
        }
      },
    );
  } else {
    res.redirect("http://127.0.0.1:3001/users/userLogin");
    // res.json({ error: "Redirect to user login page" });
    // console.log("Redirect to login page");
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_USER,
      (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          const pool = req.pool;
          pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(
              "SELECT * FROM user WHERE email=?",
              [decodedToken.email],
              (err, result) => {
                connection.release();
                if (err) {
                  // Handle the error
                  console.log("Error retrieving user:", err);
                  return res
                    .status(500)
                    .json({ status: "error", error: "Internal Server Error" });
                }
                if (result.length == 1) {
                  res.locals.user = result[0]; // Assuming the user object is stored in `result[0]`
                  next();
                }
              },
            );
          });
        }
      },
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
