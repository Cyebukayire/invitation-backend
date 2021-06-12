const express = require("express");
const {
    auth
} = require('../middlewares/auth')
const {
    getAll,
    getOne,
    createInvitation,
    updateInvitation,
    deleteInvitation,
    actionOnInvitationStatus
} = require('../controllers/invitation.controller')

const Router = express.Router();
Router.get("/getall", auth, getAll)
Router.get("/getone/:id", auth, getOne)
Router.post("/create", auth, createInvitation);
Router.put("/update/:id", auth, updateInvitation)
Router.delete("/delete/:id", auth, deleteInvitation);
Router.put("/modify-status/:id", auth, actionOnInvitationStatus)

module.exports = Router