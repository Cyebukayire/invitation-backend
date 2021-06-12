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
    status:{
        type:String,
        enum:['PENDING','SEEN']
    }

})

module.exports.UserInvitation = mongoose.model("UserInvitation",UserInvitationSchema)