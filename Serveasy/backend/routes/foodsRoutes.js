/* eslint-disable no-undef */
const express = require("express");
const foodController = require("./../controller/foodController");

const router = express.Router();

router.route("/").get(foodController.getAllFoods);
router.route("/:id").get(foodController.getaFood);

module.exports = router;
