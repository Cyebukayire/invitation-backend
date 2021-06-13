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
module.exports.revertInvitation = async(req,res)=>{
    try{
        let invitation = await UserInvitation.findByIdAndRemove(req.params.id)
        if(!invitation) return res.send({success: false, message:"Invitation process not found"}).status(404)
        return res.send({success:true, message:"Invitation reverted successfully",data: invitation}).status(201)
    }catch(e){return res.send({success:false,message:e.message})}
}