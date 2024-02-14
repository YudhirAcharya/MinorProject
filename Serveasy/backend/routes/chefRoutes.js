/* eslint-disable no-undef */
const express = require("express");
const chefController = require("./../controller/chefController");
// eslint-disable-next-line no-unused-vars
const { requireAuth } = require("../middleware/chefAuthMiddleware");
const router = express.Router();

router.route("/register").post(chefController.registerChef);
// router.route("/home").get(requireAuth, redirectHome);
// router.route("/:id").get(foodController.getaFood);
router.route("/login").post(chefController.loginChef);
// router.route("/logout").get(requireAuth, chefController.logoutChef);
router.route("/logout").get(chefController.logoutChef);
// router.route("/home").get(requireAuth, chefController.redirectChefHome);
// router.route("/home").get(chefController.redirectChefHome);

router.route("/ordersChef").get(chefController.getOrdersChef);
// router.route("/ordersChef").get(requireAuth, chefController.getOrdersChef);
router.route("/ordersChef").post(chefController.updateChefStatus);
// router.route("/ordersChef").post(requireAuth, chefController.updateChefStatus);

// router.route("/orders").get(requireAuth, chefController.redirectChefHome);
router.route("/chefLogin").get((req, res) => {
  res.render("chef/chefLogin", {});
});

router.route("/chefRegister").get((req, res) => {
  res.render("chef/chefRegister", {});
});

router.route("/chefHome").get(requireAuth, (req, res) => {
  res.render("chef/chefHome", {});
});
module.exports = router;
