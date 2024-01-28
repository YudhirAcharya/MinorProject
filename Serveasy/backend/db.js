const mysql = require('mysql');
const dotenv= require('dotenv');

dotenv.config({ path: './config.env' });

//database connection
const db = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB
});
db.connect((err)=> {
    if (err) throw err;
    console.log("Database Connected");
    });
