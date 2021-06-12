const mongoose = require('mongoose')
const pagination = require('mongoose-paginate-v2')

const InvitationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Event"
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE'
    },
    // sent_to:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"User"
    //     }
    // ],
    // views:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"User"
    // }]
}, {
    timestamps: true
})

InvitationSchema.plugin(pagination)

module.exports.Invitation = mongoose.model("Invitation", InvitationSchema)