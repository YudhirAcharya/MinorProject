const pool = require("./../app");
// exports.getAllUsers = (req, res) => {
//   const pool = req.pool;
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log(`connected as id ${connection.threadId}`);

//     connection.query("Select * from user", (err, rows) => {
//       connection.release();

//       if (!err) {
//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     });
//   });
// };

//Insert a user
exports.postUser = (req, res) => {
  const pool = req.pool;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    const params = req.body;
    connection.query("insert into user set ?", params, (err, rows) => {
      connection.release();

      if (!err) {
        res.send(`User with the record id: ${params.user_id} has been added.`);
      } else {
        console.log(err);
      }
    });
    console.log(req.body);
  });
};
