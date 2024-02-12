/* eslint-disable no-undef */
const express = require("express");
const userController = require("./../controller/userController");
const router = express.Router();

router.route("/register").post(userController.registerUser);
// router.route("/home").get(requireAuth, redirectHome);
// router.route("/:id").get(foodController.getaFood);
router.route("/login").post(userController.loginUser);
router.route("/logout").get(userController.logoutUser);
module.exports = router;
