var express = require("express");
var router = express.Router();
const User = require("../models").User;
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json({
      newUser,
    });
  } catch (error) {
    console.log(req.body);
    return res.status(500).json({ error: error });
  }
});

router.put("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id: userId },
    });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id: userId } });
      return res.status(200).json({ user: updatedUser });
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

// router.post("/users/show",async(req, res) =>{
//   console.log(req.body)
// });

/* GET users listing. */

/* index */

router.get("/", async function (req, res, next) {
  const users = await User.findAll();
  res.render("../views/users/index", { users });
});

router.get("/json", async function (req, res, next) {
  const users = await User.findAll();
  res.json(users);
});

router.get("/new", function (req, res) {
  res.render("../views/users/new", { action: "users/show" });
});

router.delete("/", async function (req, res) {
  const [user] = await User.findAll({
    limit: 1,
  });
  await user.destroy();
  res.json(user);
});

/*
router.get("/:userId", async function (req, res, next) {
  const {userId}= req.params;
  const user = await User.findOne({where:{id:userId}});
  if (req.params.format) res.json(user);
  else res.render("../views/users/edit", { user: user, action:userId });
})*/

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  res.format({
    html() {
      res.render("../views/users/show", { user });
    },
    json() {
      res.json(user);
    },
  });
});

module.exports = router;
