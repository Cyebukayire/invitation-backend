const {
    Invitation
} = require('../models/invitation.model')


module.exports.createInvitation = async (req, res) => {
    try {
        // validate user 
        //  validate event

        const invitation = await Invitation.create({
            ...req.body
        });
        if (!invitation) return res.send({
            success: false,
            message: "Creating an Invitation failed"
        }).status(400);
        return res.send({
            success: true,
            data: invitation
        }).status(200)
    } catch (e) {
        return res.send({
            success: false,
            data: e.message
        })
    }
}


// get all invitations

module.exports.getAll = async (req, res) => {
    try {
        const invitations = await Invitation.find();
        if (!invitations) return res.send({
            success: false,
            message: "Invitations not found"
        }).status(404);
        return res.send({
            success: true,
            data: invitations
        }).status(201);
    } catch (e) {
        return res.send({
            success: false,
            message: "Getting all invitations failed"
        })
    }
}

// getting one invitation
module.exports.getOne = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.id);
        if (!invitation) return res.send({
            success: false,
            message: "Invitation is not found"
        }).status(404);
        return res.send({
            success: true,
            data: invitation
        }).status(201);
    } catch (e) {
        return res.send({
            success: false,
            data: e.message
        })
    }
}

// update invitation
module.exports.updateInvitation = async (req, res) => {
    try {
        const invitation = await Invitation.findById(req.params.id);
        if (!invitation) return res.send({
            success: false,
            message: "Invitation not found"
        }).status(404);
        const updatedInvitation = await Invitation.findByIdAndUpdate(req.params.id, {
            ...req.body
        }, {
            new: true
        })
        if (!updatedInvitation) return res.send({
            success: false,
            message: "Invitation updating failed"
        }).status(400);
        return res.send({
            status: true,
            data: updatedInvitation
        }).status(201);
    } catch (e) {
        return res.send({
            success: false,
            message: e.message
        })
    }
}

// deleting the invitation
module.exports.deleteInvitation = async (req, res) => {
    try {
        const user = await Invitation.findById(req.params.id)
        if (!user) return res.send({
            success: false,
            message: "Invitation not found"
        }).status(404);
        const deletedInvitation = await Invitation.findByIdAndDelete(req.params.id);
        if (!deletedInvitation) return res.send({
            success: false,
            message: "Invitation not deleted"
        }).status(400)
        return res.send({
            success: true,
            message: "Invitation deleted successfulll",
            data: deletedInvitation
        })
    } catch (e) {
        return res.send({
            success: false,
            data: e.message
        })
    }
}

// acivating or deactivating the invitation status[active, inactive]
module.exports.actionOnInvitationStatus = async (req, res) => {
    try {
        let user = await Invitation.findById(req.params.id);
        if (!user) return res.send({
            success: false,
            message: "Invitation not found"
        }).status(404);
        if (user.status === 'ACTIVE') user.status = 'INACTIVE';
        else user.status = 'ACTIVE'
        user.save();
        return res.send({
            success: true,
            message: "Invitation status modified successfully",
            data: user
        }).status(201);
    } catch (e) {
        return res.send({
            success: false,
            data: e.message
        })
    }
}

// clone job function here