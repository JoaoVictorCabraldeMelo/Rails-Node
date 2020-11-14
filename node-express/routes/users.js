var express = require("express");
var router = express.Router();
const User = require("../models").User;

/* GET users listing. */
/* index */
router.get("/:format?", async function (req, res, next) {
  const users = await User.findAll();
  if (req.params.format) res.json(users);
  else res.render("../views/users/index", { users });
});

module.exports = router;
