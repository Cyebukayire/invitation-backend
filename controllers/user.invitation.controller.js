const {
    UserInvitation
} = require("../models/m2m/UserInvitation.model")

// send an invitation to the user

module.exports.assignInvitation = async (req, res) => {
    try {
        // validate user && invitation existance

        let userInvitation = await UserInvitation.create({
            ...req.body
        })
        if (!userInvitation) return res.send({
            status: false,
            message: "Sending an invitation failed"
        }).status(400)
        return res.send({
            status: true,
            message: "Sending invitation is done successfully",
            data: userInvitation
        }).status(201)
    } catch (e) {
        return res.send({
            success: false,
            data: e.message
        })
    }
}


// revert the sent invitation 
module.exports.revertInvitation = async (req, res) => {
    try {
        let invitation = await UserInvitation.findByIdAndRemove(req.params.id)
        if (!invitation) return res.send({
            success: false,
            message: "Invitation process not found"
        }).status(404)
        return res.send({
            success: true,
            message: "Invitation reverted successfully",
            data: invitation
        }).status(201)
    } catch (e) {
        return res.send({
            success: false,
            message: e.message
        })
    }
}


// invitation seen
module.exports.seenInvitation = async (req, res) => {
    try{
        let invitation = await UserInvitation.findById(req.params.id);
        if(!invitation) return res.send({success:false,message:'Invitation not found'}).status(404)
        invitation.read_status  = 'SEEN'
        invitation.save();
        return res.send({success:true,message:'Invitation is seen',data:invitation}).status(201);
    }catch(e){return res.send({success:false,data:e.message})}
}

// invitation rejected

// invitation seen
module.exports.rejectInvitation = async (req, res) => {
    try{
        let invitation = await UserInvitation.findById(req.params.id);
        if(!invitation) return res.send({success:false,message:'Invitation not found',data:invitation}).status(404)
        invitation.status  = 'REJECTED'
        invitation.save();
        return res.send({success:true,message:'Invitation is rejected',data:invitation}).status(201);
    }catch(e){return res.send({success:false,data:e.message})}
}

// invitation approved
module.exports.approveInvitation = async (req, res) => {
    try{
        let invitation = await UserInvitation.findById(req.params.id);
        if(!invitation) return res.send({success:false,message:'Invitation not found'}).status(404)
        invitation.status  = 'APPROVED'
        invitation.save();
        return res.send({success:true,message:'Invitation is approved',data:invitation}).status(201);
    }catch(e){return res.send({success:false,data:e.message})}
}


// get invitation by user_id
module.exports.getInvitationsByUserId = async (req, res) => {
    try{
        let invitation = await UserInvitation.findOne({user_id:req.params.id})
        if(!invitation) return res.send({success:false,message:'User not found'}).status(404);
        let invitations = await UserInvitation.findOne({user_id:req.params.id}).populate('invitation_id')
        if(!invitations) return res.send({success:false,message:'Invitations not found'}).status(404);
        return res.send({success:true,message:'Invitations found',data:invitations}).status(201)
    }catch(e){return res.send({success:false,data:e.message})}
}