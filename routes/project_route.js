const express = require("express");
const router = express.Router();
const Project = require("../models/Projcet");
const Language = require("../models/langu")

router.get('/allUserProject/:id',(req,res)=>{
    
    Project.find({userId:req.params.id})
  
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/addProject",(req,res)=>{
    const { userId, p_title ,p_desc, start_time,end_time,p_link} = req.body
    const newSave = new Project({
        userId,
        p_title ,p_desc, start_time,end_time,p_link
  })
  newSave.save().then(result => {
      res.json(result)
  }).catch(err => {
      console.log(err)
          
  })
})
router.get('/allUserSLan/:id',(req,res)=>{
    
    Language.find({userId:req.params.id})
  
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post("/addLanguage",(req,res)=>{
    const { userId, lan_name,lan_skill} = req.body
    const newSave = new Language({
        userId,
          lan_name,lan_skill
  })
  newSave.save().then(result => {
      res.json(result)
  }).catch(err => {
      console.log(err)
          
  })
})

module.exports = router;