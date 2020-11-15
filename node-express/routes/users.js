var express = require("express");
var router = express.Router();
const User = require("../models").User;
const bodyParser= require('body-parser')

router.use(bodyParser.urlencoded({extended:true}))





 router.post("/users/show",async(req, res) =>{
  try{

    const newUser= await User.create(req.body)
    return res.status(201).json({
      newUser,
    })

  } catch(error){
    console.log(req.body)
      return res.status(500).json({error: error})
  }
});


router.put("/users/:userId", async(req, res)=>{
  try{
    const {userId}= req.params;
    const [updated]= await User.update(req.body,{
      where: {id: userId}
    })
    if(updated){
      const updatedUser = await User.findOne({where:{id:userId}})
      return res.status(200).json({user: updatedUser});
    }
    throw new Error('User not found');

  }catch(error){
    return res.status(500).json({error: error})
  }
})

// router.post("/users/show",async(req, res) =>{
//   console.log(req.body)
// });


 /* GET users listing. */

 /* index */

 router.get("/:format?", async function (req, res, next) {
  const users = await User.findAll();
  if (req.params.format) res.json(users);
  else res.render("../views/users/index", { users });
});


module.exports = router;
