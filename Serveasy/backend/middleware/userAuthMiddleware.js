/* eslint-disable no-unused-vars */
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
          res.redirect("http://127.0.0.1:3001/userLogin");
          // res.json({ error: "Redirect to user login page" });
          // console.log("Redirect to login page");
        } else {
          console.log(decodedToken);
          next();
        }
      },
    );
  } else {
    res.redirect("http://127.0.0.1:3001/userLogin");
    // res.json({ error: "Redirect to user login page" });
    // console.log("Redirect to login page");
  }
};

module.exports = requireAuth;
