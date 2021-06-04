const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    eventCat:{
        type: String,
        required: true
    },
    event_name:{
        type: String,
        required: true,
        minlength:[2,"The name should have at least 2 characters"]
    },
    guest_limit:{
        type: Number,
        required: true
    },
    event_time:{
        type: Date,
        required:[true,"The date is required"],
        default:Date.now()
    },
    event_description:{
        type: String,
        required: true
    },
    eStatus:{
        type: String,
        default: "ACTIVE",
        enum: ["ACTIVE","INACTIVE"]
    }

})

module.exports.Event = mongoose.model('Event',eventSchema);