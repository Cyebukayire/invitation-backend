const mongoose = require('mongoose')

const UserInvitationSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    },

    invitation_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Invitation"
    },
    read_status:{
        type:String,
        enum:['PENDING','SEEN'],
        default:"PENDING"
    },
    status:{
        type:String,
        enum:['PENDING','APPROVED','REJECTED'],
        default:'PENDING'
    }


})

module.exports.UserInvitation = mongoose.model("UserInvitation",UserInvitationSchema)