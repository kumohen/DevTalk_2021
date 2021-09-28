const express = require("express");
const router = express.Router();
const Skills = require("../models/skills");
const Friend = require("../models/Friend")
const User = require("../models/user")
const     auth = require("../middleware/auth");

router.get('/allUserSkill/:id',(req,res)=>{
  
    Skills.find({userId:req.params.id})
  
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/addSkills",(req,res)=>{
    const newSave = new Skills({
        userId:req.body.userId,
        skill_name:req.body.skill_name 
  })
  newSave.save().then(result => {
      res.json(result)
  }).catch(err => {
      console.log(err)
          
  })
})

router.post("/sendFReq",  async (req,res)=>{
    const {user_name,user_bio,user_pic,userId,senderId} = req.body ;

     const findUser = await User.find({_id:userId});
      findUser[0].inviList.push(senderId);

     

  await findUser[0].save();
   
    const newSave =  new Friend({
      
        user_name,user_bio,user_pic,userId,senderId
  })
  await newSave.save().then(result => {
      res.json(result)
  }).catch(err => {
      console.log(err)
          
  })
})

router.get('/userInvitation',auth,(req,res)=>{
  
    Friend.find({userId:req.user._id})
  
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router;