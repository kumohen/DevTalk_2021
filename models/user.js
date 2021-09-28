const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  inviList: [{ type: ObjectId, ref: "User" }],

  profileImage: {
    type: String,
  },
  bg_image: {
    type: String,
  },
   location:{
    type: String,
   },
  bio: {
    type: String,
  },
 
  followers: [
    {
      name: String,
      bio: String,
      image: String,
      userId:String,
    },
  ],
  languages:[]


}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);