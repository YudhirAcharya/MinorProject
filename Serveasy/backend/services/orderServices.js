/* eslint-disable no-undef */
// Save an order
exports.save = (req, res) => {
  const pool = req.pool;
  const { name, price } = req.body; // Assuming name and price are provided in the request body

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      "INSERT INTO orders (name, price) VALUES (?, ?)",
      [name, price],
      (err, result) => {
        connection.release();

        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res
            .status(201)
            .json({ status: "success", insertedId: result.insertId });
        }
      },
    );
  });
};

// Find a order item by ID
exports.findById = (req, res) => {
  const pool = req.pool;
  const id = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("SELECT * FROM orders WHERE id = ?", id, (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (rows.length === 0) {
          res.status(404).json({ error: "Order not found" });
        } else {
          res.status(200).json({ status: "success", data: rows[0] });
        }
      }
    });
  });
};

// Get total count of orders
exports.getCount = (req, res) => {
  const pool = req.pool;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query("SELECT COUNT(*) AS count FROM orders", (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.status(200).json({ status: "success", count: rows[0].count });
      }
    });
  });
};

// Get orders based on filter
exports.getWhere = (req, res) => {
  const pool = req.pool;
  const filter = req.body.filter || {}; // Assuming filter is provided in the request body

  let query = "SELECT * FROM orders";
  const values = [];

  if (Object.keys(filter).length > 0) {
    const conditions = Object.keys(filter)
      .map((key) => `${key} = ?`)
      .join(" AND ");
    query += ` WHERE ${conditions}`;
    Object.values(filter).forEach((value) => values.push(value));
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(query, values, (err, rows) => {
      connection.release();

      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res
          .status(200)
          .json({ status: "success", results: rows.length, data: rows });
      }
    });
  });
};
