/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const foodController = require("./../controller/foodController");
// const requireAuth = require("../middleware/userAuthMiddleware");
const router = express.Router();

router.route("/").get(foodController.getAllFoods);
router.route("/:id").get(foodController.getaFood);

module.exports = router;
