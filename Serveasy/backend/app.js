/* eslint-disable no-undef */

const express = require("express");
const { default: axios } = require("axios");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const foodsRoutes = require("./routes/foodsRoutes");
const usersRoutes = require("./routes/usersRoutes");

const orderRoutes = require("./routes/orderRoutes");

const chefRoutes = require("./routes/chefRoutes");
const delivererRoutes = require("./routes/delivererRoutes");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,PATCH,DELETE", // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

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
app.use(
  "/chef",
  (req, res, next) => {
    // Middleware to attach the database pool to the request object
    req.pool = pool;
    next();
  },
  chefRoutes,
);
app.use(
  "/deliverer",
  (req, res, next) => {
    // Middleware to attach the database pool to the request object
    req.pool = pool;
    next();
  },
  delivererRoutes,
);

app.use(
  "/orders",
  (req, res, next) => {
    // Middleware to attach the database pool to the request object
    req.pool = pool;
    next();
  },
  orderRoutes,
);

//Khalti Route
app.post("/khalti-api", async (req, res) => {
  const payload = req.body;
  const khaltiResponse = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    payload,
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    },
  );
  if (khaltiResponse) {
    res.json({
      success: true,
      data: khaltiResponse?.data,
    });
  } else {
    res.json({
      success: false,
      message: "something went wrong",
    });
  }
});

//PAGINATION
app.get("/api/foods", (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
  const offset = (page - 1) * limit; // Calculate offset

  // Acquire a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection: ", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Use the acquired connection to execute the query with pagination
    connection.query(
      "SELECT * FROM food LIMIT ?, ?",
      [offset, limit],
      (err, rows) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          console.error("Error executing MySQL query: ", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        // Send the response with fetched data
        res.status(200).json({
          status: "success",
          results: rows.length,
          currentPage: page,
          totalPages: Math.ceil(rows.length / limit),
          data: {
            rows,
          },
        });
      },
    );
  });
});

// // TO TEST IF BACKEND HAS CONNECTION WITH MYSQL
// pool.query("SELECT * FROM dummy", function (error, results, fields) {
//   if (error) throw error;

//   results.forEach((element) => {
//     console.log(element);
//   });
// });

//Listen on environment on port
app.listen(port, () => console.log(`Listen on port ${port}`));
module.exports = pool;
