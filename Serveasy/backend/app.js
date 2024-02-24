/* eslint-disable no-undef */

const express = require("express");
// const { default: axios } = require("axios");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const foodsRoutes = require("./routes/foodsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const requireAuth = require("./middleware/userAuthMiddleware");
const path = require("path");

const chefRoutes = require("./routes/chefRoutes");
const delivererRoutes = require("./routes/delivererRoutes");
const khaltiRoutes = require("./routes/khaltiRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3001;
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  // origin: ["http://localhost:5173", "http://127.0.0.1:8005/"],
  origin: "*",
  methods: "GET,POST,PUT,PATCH,DELETE", // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
app.get("/userLogin", (req, res) => {
  res.render("user/userLogin");
});
app.get("/userRegister", (req, res) => {
  res.render("user/userRegister");
});
app.get("/userHome", requireAuth, (req, res) => {
  const userId = req.query.userId;
  res.redirect(`http://localhost:5173/user-home?userId=${userId}`);
  // res.redirect("http://localhost:5173/userhome2");
});
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
  "/khalti-api",
  (req, res, next) => {
    // Middleware to attach the database pool to the request object
    req.pool = pool;
    next();
  },
  khaltiRoutes,
);
app.get("/", (req, res) => {
  res.redirect("http://localhost:5173/");
});

// // Khalti Route
// app.post("/khalti-api", async (req, res) => {
//   try {
//     const payload = req.body;
//     const khaltiResponse = await axios.post(
//       "https://a.khalti.com/api/v2/epayment/initiate/",
//       payload,
//       {
//         headers: {
//           Authorization: `Key 11cc7f03699b4416b19b074d24d776ce`,
//         },
//       },
//     );
//     res.json({
//       success: true,
//       data: khaltiResponse?.data,
//     });
//   } catch (error) {
//     console.error("Error initiating payment with Khalti:");
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong while initiating payment with Khalti",
//       error: error.message,
//     });
//   }
// });

//PAGINATION
app.get("/api/foods", (req, res) => {
  // Pagination parameters
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 30; // Default limit to 40 if not provided
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

//by yudhir
//for chef
// let storedData = [];

// function fetchData(callback) {
//   pool.query("SELECT * FROM ordered_items", function (error, results, fields) {
//     if (error) throw error;

//     results.forEach((element) => {
//       console.log(element);
//       storedData.push(element);
//     });
//     callback(storedData);
//   });
// }

// module.exports = {
//   fetchData,
//   storedData,
// };

//for-chef

//Listen on environment on port
app.listen(port, () => console.log(`Listen on port ${port}`));
module.exports = pool;
