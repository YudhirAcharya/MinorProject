/* eslint-disable no-undef */
// Insert a user
exports.registerOrder = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    const { order_id, food_name, ingredients, user_id, quantity } = req.body; // Destructure user_id and Name from req.body

    // Insert user into the database
    connection.query(
      "INSERT INTO orders (order_id, food_name,ingredients,user_id,quantity) VALUES (?, ?, ?, ?,?)",
      [order_id, food_name, ingredients, user_id, quantity],
      (err) => {
        connection.release();
        if (err) {
          // console.error(err);
          res.status(500).json({ error: "Failed to register the order" });
        } else {
          res.status(201).json({
            status: "success",
            message: "Order registered successfully",
          });
        }
      },
    );
  });
};
