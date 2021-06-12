const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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
        required:true
    },
    phone:{
        type:Number,
        minlength:[12,"Phone number should at least be 12 digits"]
    },
    status:{
        type:String,
        default:'ACTIVE',
        enum:['ACTIVE','INACTIVE']
    }
})

UserSchema.methods.generateAuthToken = async function(){
    return jwt.sign({
        id:this._id,
        first_name:this.first_name,
        last_name:this.last_name,
        email:this.email,
        gender:this.gender
    },process.env.TOKEN_SECRET)
}


module.exports.User = mongoose.model("User", UserSchema);