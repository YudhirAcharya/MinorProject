/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const delivererController = require("./../controller/delivererController");
const { requireAuth } = require("../middleware/delivererAuthMiddleware");
const router = express.Router();

router.route("/register").post(delivererController.registerDeliverer);
router.route("/login").post(delivererController.loginDeliverer);
// router.route("/logout").get(requireAuth, delivererController.logoutDeliverer);
router.route("/logout").get(delivererController.logoutDeliverer);
// router
//   .route("/home")
//   .get(requireAuth, delivererController.redirectDelivererHome);

// router
//   .route("/ordersDeliverer")
//   .get(requireAuth, delivererController.getOrders);

router.route("/ordersDeliverer").get(delivererController.getOrders);
// router
//   .route("/ordersDeliverer")
//   .post(requireAuth, delivererController.updateOrderStatus);
router.route("/ordersDeliverer").post(delivererController.updateOrderStatus);
router
  .route("/ordeToRecommendationTable")
  .post(delivererController.moveToRecommendationTable);

router.route("/delivererLogin").get((req, res) => {
  res.render("deliverer/delivererLogin", {});
});

router.route("/delivererRegister").get((req, res) => {
  res.render("deliverer/delivererRegister", {});
});

router.route("/delivererHome").get(requireAuth, (req, res) => {
  res.render("deliverer/delivererHome", {});
});
module.exports = router;
