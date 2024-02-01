/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const foodsRoutes = require("./routes/foodsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());

//MYSQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "serveasy",
});

// ROUTES
app.use(
  "/foods",
  (req, res, next) => {
    // Middleware to attach the database pool to the request object
    req.pool = pool;
    next();
  },
  foodsRoutes,
);
app.use(
  "/users",
  (req, res, next) => {
    // Middleware to attach the database pool to the request object
    req.pool = pool;
    next();
  },
  usersRoutes,
);

//Listen on environment on port
app.listen(port, () => console.log(`Listen on port ${port}`));
module.exports = pool;
