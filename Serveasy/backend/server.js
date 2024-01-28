const express=require('express');
const mysql = require('mysql');
const app = require('./app');
const env=require('dotenv')
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

