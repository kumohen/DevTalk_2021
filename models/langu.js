const mongoose = require("mongoose");

const lanSchema = new mongoose.Schema({


    userId: {
        type: String
    },
    lan_name: {
        type: String,
        required: true
    },
    lan_skill:{
        type: String,
    }



}, { timestamps: true });

module.exports = mongoose.model("Language", lanSchema);