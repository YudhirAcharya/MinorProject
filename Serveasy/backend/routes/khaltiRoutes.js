/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const khaltiController = require("./../controller/khaltiController");

const router = express.Router();

router.route("/").post(khaltiController.khaltiPayment);

module.exports = router;
