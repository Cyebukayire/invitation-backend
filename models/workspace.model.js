const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    wspace_name: {
        type: String,
        required: true,
        unique: [true,"The name is already taken"],
        minlength: [3,"The name should at least have 3 characters!"]
    },
    wspace_description: {
        type: String,
        required: true
    },
    wStatus: {
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE","INACTIVE"]
    }

},{
    timestamps:{
        createdAt: true,
        updatedAt: true
    }
})

module.exports.WorkSpace = mongoose.model("WorkSpace", workSchema);