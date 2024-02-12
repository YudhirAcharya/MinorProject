/* eslint-disable no-undef */
const express = require("express");

const { requireAuth } = require("../middleware/authMiddleware");
const redirectHome = require("../controller/redirectHome");
const router = express.Router();

router.route("/").get(requireAuth, redirectHome);

module.exports = router;
