const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Friend = require("../models/Friend")
const Post = require('../models/posts');
const Project = require("../models/Projcet");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer')

const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET } = require("../keys");

const requireLogin = require("../middleware/auth");

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

router.post("/signup", (req, res) => {
  const {
    name,
    password, email

  } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all the fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that email" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name
        });

        user
          .save()
          .then((user) => {
            res.json(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please add email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {

          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);

          res.json({
            token,
            user: savedUser
          });
        } else {
          return res.status(422).json({ error: "Invalid Email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/profile/:id", (req, res) => {

  User.find({ _id: req.params.id })
    .select("-password")
    .then((admins) => {
      res.json(admins);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/updateProfile", requireLogin,async (req, res) => {

  const {userId,name,bio,location} = req.body ;
  const user = await User.find({_id:userId});

   user[0].name = name ;
  user[0].bio = bio ;
  user[0].location = location ;

   user[0].save();
 

});

router.get("/userList", (req, res) => {

  User.find()
    .select("_id fullname username profileImage ")
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/profilePic", upload.single("image"), requireLogin, (req, res) => {

  let reqFiles
  const url = req.protocol + '://' + req.get('host')
  reqFiles = url + '/public/' + req.file.filename;


  User.findByIdAndUpdate(
    req.user._id,
    { $set: { profileImage: reqFiles } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "pic canot post" });
      }
      res.json(result);
    }
  );
});


router.put("/bgPic", upload.single("image"), requireLogin, (req, res) => {

  let reqFiles
  const url = req.protocol + '://' + req.get('host')
  reqFiles = url + '/public/' + req.file.filename;


  User.findByIdAndUpdate(
    req.user._id,
    { $set: { bg_image: reqFiles } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: "pic canot post" });
      }
      res.json(result);
    }
  );
});


router.put("/follow", requireLogin,async (req, res) => {

 
  const follower = {
    name: req.user.name,
    bio: req.user.bio,
    userId: req.user._id,
    image: req.user.profileImage,
  };
  const following = {
    name: req.body.user_name,
    userId: req.body.senderId,
    bio: req.body.user_bio,
    image: req.body.user_pic,
  };


   
  const followingUser = await User.find({_id:req.body.userId});
  var arr = []
  followingUser[0].inviList.forEach(item => {
    if(item != req.body.senderId) arr.push(item)
  })
 
 followingUser[0].inviList = arr ;

  await followingUser[0].save();
  const followerUser = await User.find({_id:req.body.senderId});
   followingUser[0].followers.push(following);

   await followingUser[0].save();
   
  

   followerUser[0].followers.push(follower);

  await followerUser[0].save();

  const frinedUser = await Friend.find({senderId:req.body.senderId})


   frinedUser[0].pending_status = false ;

 

    await frinedUser[0].save();
 });

 router.post("/reject", requireLogin,async (req, res) => {
  

   const frinedUser = await Friend.find({senderId:req.body.senderId})
   frinedUser[0].pending_status = false ;
   await frinedUser[0].save();

 });

 router.get("/users/:friendId",async(req,res)=>{
  const doc = await User.find({_id:req.params.friendId});
  try {
    res.json(doc)
  } catch (error) {
    
  }
 })


router.get("/findFollower", requireLogin, (req, res) => {

  let followings = [];
  for (let item of req.user.followers) {
    followings.push(item.userId);
  }
  followings.push(req.user._id);

  User.find({ _id: { $nin: followings } }, (err, users) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(users);
  });
});



router.put("/langu",requireLogin, async (req,res)=>{
     
  const user =  await User.findOne({_id:req.user._id});
  user.language.push(req.body.language);
  await user.save() ;
  res.json(user)
    
})

module.exports = router;