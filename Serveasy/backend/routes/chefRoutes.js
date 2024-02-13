/* eslint-disable no-undef */
const express = require("express");
const chefController = require("./../controller/chefController");
const { requireAuth } = require("../middleware/chefAuthMiddleware");
const router = express.Router();

router.route("/register").post(chefController.registerChef);
// router.route("/home").get(requireAuth, redirectHome);
// router.route("/:id").get(foodController.getaFood);
router.route("/login").post(chefController.loginChef);
router.route("/logout").get(chefController.logoutChef);
router.route("/home").get(requireAuth, chefController.redirectChefHome);

router.route("/ordersChef").get(requireAuth, chefController.getOrdersChef);
router
  .route("/updateChefStatus")
  .post(requireAuth, chefController.updateChefStatus);

// router.route("/orders").get(requireAuth, chefController.redirectChefHome);

module.exports = router;
