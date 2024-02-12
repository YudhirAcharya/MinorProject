/* eslint-disable no-undef */
// redirectHome.js
const redirectHome = (req, res) => {
  //res.redirect("http://localhost:5173/home"); // Redirect to the home page
  res.status(200).json({ success: "Redirecting to Home Page" });
};
module.exports = redirectHome;
