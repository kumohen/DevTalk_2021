const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({


    userId: {
        type: String
    },
    skill_name: {
        type: String,
        required: true
    }



}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);