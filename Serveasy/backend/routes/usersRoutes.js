const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/").post(userController.postUser);
// router.route("/:id").get(foodController.getaFood);

module.exports = router;
