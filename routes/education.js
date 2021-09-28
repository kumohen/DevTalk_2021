const express = require("express");
const router = express.Router();
const Education = require("../models/education");


router.get('/allUserEdu/:id',(req,res)=>{
  
    Education.find({userId:req.params.id})
  
    .then(post=>{
        res.json(post)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/addEdu",(req,res)=>{
    const {cour_name,inst_name,cour_type,study_from,study_to,userId} = req.body
    const newSave = new Education({
        cour_name,inst_name,cour_type,study_from,study_to,userId
  })
  newSave.save().then(result => {
      res.json(result)
  }).catch(err => {
      console.log(err)
          
  })
})

module.exports = router;