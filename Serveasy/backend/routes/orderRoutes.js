/* eslint-disable no-undef */
const express = require("express");
const orderController = require("./../controller/orderController");
const router = express.Router();

router.route("/").post(orderController.registerOrder);

module.exports = router;
