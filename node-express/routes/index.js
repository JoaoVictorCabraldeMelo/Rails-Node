var express = require('express');
var router = express.Router();
const User = require("../models").User;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/users/new",function (req, res) {
  res.render("../views/users/new",{ action:"users/show" });
 });


router.get("/users/:userId", async function (req, res, next) {
  const {userId}= req.params;
  const user = await User.findOne({where:{id:userId}});
  if (req.params.format) res.json(user);
  else res.render("../views/users/edit", { user: user, action:userId });
})
module.exports = router;
