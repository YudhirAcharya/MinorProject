/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const pool = require("./../app");
exports.getAllFoods = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query("Select * from food", (err, rows) => {
      connection.release();

      if (!err) {
        res.status(200).json({
          status: "success",
          results: rows.length,
          data: {
            rows,
          },
        });
      } else {
        console.log(err);
      }
    });
  });
};

//Get a food by ID
exports.getaFood = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    connection.query(
      "Select * from food where FoodID=?",
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
