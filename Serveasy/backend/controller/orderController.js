/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

exports.registerOrder = (req, res) => {
  const pool = req.pool;
  const { orders_id, user_id, foods } = req.body; // Destructure order_id, user_id, and foods array from req.body

  pool.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to connect to database" });
      return;
    }

    // Begin a transaction to ensure atomicity
    connection.beginTransaction((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to begin transaction" });
        return;
      }

      // Insert the order into the orders table
      connection.query(
        "INSERT INTO orders (orders_id, user_id) VALUES (?, ?)",
        [orders_id, user_id],
        (err, orderResult) => {
          if (err) {
            connection.rollback(() => {
              console.error(err);
              res.status(500).json({ error: "Failed to register the order" });
            });
            return;
          }

          // Insert each food item into the ordered_item table
          foods.forEach(({ order_id, food_name, ingredients, quantity }) => {
            connection.query(
              "INSERT INTO ordered_items(order_id, food_name, ingredients, user_id, quantity, orders_id) VALUES (?, ?, ?, ?, ?,?)",
              [order_id, food_name, ingredients, user_id, quantity, orders_id],
              (err) => {
                if (err) {
                  connection.rollback(() => {
                    console.error(err);
                    res
                      .status(500)
                      .json({ error: "Failed to register the ordered items" });
                  });
                  return;
                }
              },
            );
          });

          // Commit the transaction if all queries succeed
          connection.commit((err) => {
            if (err) {
              connection.rollback(() => {
                console.error(err);
                res.status(500).json({ error: "Failed to commit transaction" });
              });
            } else {
              connection.release();
              res.status(201).json({
                status: "success",
                message: "Order registered successfully",
              });
            }
          });
        },
      );
    });
  });
};
