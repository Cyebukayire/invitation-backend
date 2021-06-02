const mongoose = require('mongoose')
const eventCatSchema = new mongoose.Schema({
    cat_name:{
        type:String,
        required: true,
        minlength: [2, "category name must be at least 2 characters"]
    },
    cat_description:{
        type: String,
        required: true
    }
})
module.exports.eventCat = mongoose.model("eventCat",eventCatSchema)