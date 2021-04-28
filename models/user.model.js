const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required: true,
        minlength: [2, "Firstname must be at least 2 characters"]
    },
    last_name: {
        type:String,
        required:true,
        minlength:[2,"Lastname must be at least 2 characters"]
    },

    gender:{
        type:String,
        required:true,
        enum:['MALE','FEMALE']
    },

    email:{
        type:String,
        unique:[true,"Another user has this email"],
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:[8, "Password should be at least 8 characters"]
    },
    phone:{
        type:Number,
        required:false,
        minlength:[12,"Phone number should at least be 12 digits"]
    },
    status:{
        type:String,
        default:'ACTIVE',
        enum:['ACTIVE','INACTIVE']
    }
})

module.exports.User = mongoose.model("User", UserSchema);