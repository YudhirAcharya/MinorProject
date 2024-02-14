/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const userController = require("./../controller/userController");
const { requireAuth } = require("../middleware/userAuthMiddleware");
const router = express.Router();

router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
// router.route("/logout").get(requireAuth, userController.logoutUser);
router.route("/logout").get(userController.logoutUser);
// router.route("/home").get(requireAuth, userController.redirectUserHome);
// router.route("/home").get(requireAuth, userController.redirectUserHome);
router.route("/registerOrder").post(userController.registerOrder);
router.route("/recommendationData").get(userController.giveRecommendationData);

router.route("/userLogin").get((req, res) => {
  res.render("user/userLogin", {});
});

router.route("/userRegister").get((req, res) => {
  res.render("user/userRegister", {});
});

router.route("/userHome").get(requireAuth, (req, res) => {
  res.render("user/userHome", {});
});
module.exports = router;
