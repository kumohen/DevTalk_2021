const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({


    userId: {
        type: String
    },
    senderId:{
        type: String
    },
     user_name:{
        type: String
     },
     user_bio:{
         type:String
     },
     user_pic:{
        type:String
     },
    pending_status:{
         type:Boolean,
         default:true
     }



}, { timestamps: true });

module.exports = mongoose.model("Friend", friendSchema);