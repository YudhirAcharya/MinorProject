/* eslint-disable no-undef */
const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/register").post(userController.registerUser);
// router.route("/:id").get(foodController.getaFood);

module.exports = router;
