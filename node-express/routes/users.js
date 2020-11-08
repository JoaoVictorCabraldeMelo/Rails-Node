var express = require("express");
var router = express.Router();
const User = require("../models").User;

/* GET users listing. */
/* index */
router.get("/", async function (req, res, next) {
  const users = await User.findAll();
  res.render("../views/users/index", { users });
});

module.exports = router;
