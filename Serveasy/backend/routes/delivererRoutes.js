/* eslint-disable no-undef */
const express = require("express");
const delivererController = require("./../controller/delivererController");
const { requireAuth } = require("../middleware/delivererAuthMiddleware");
const router = express.Router();

router.route("/register").post(delivererController.registerDeliverer);
// router.route("/home").get(requireAuth, redirectHome);
// router.route("/:id").get(foodController.getaFood);
router.route("/login").post(delivererController.loginDeliverer);
router.route("/logout").get(delivererController.logoutDeliverer);
router
  .route("/home")
  .get(requireAuth, delivererController.redirectDelivererHome);

router
  .route("/ordersDeliverer")
  .get(requireAuth, delivererController.getOrders);
router
  .route("/ordersDeliverer")
  .post(requireAuth, delivererController.updateOrderStatus);

module.exports = router;
