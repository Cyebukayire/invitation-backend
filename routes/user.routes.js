const express = require("express");
const {
    auth
} = require("../middlewares/auth")
const {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    activDeactivateUser,
    login,
    updatePassword
} = require('../controllers/user.controller');
const Router = express.Router();

Router.get("/getOne/:id", getUser);
Router.get("/getAll", auth, getUsers);
Router.post("/create", createUser);
Router.put("/update/:id", updateUser);
Router.put("/updateStatus/:id", activDeactivateUser);
Router.delete("/delete/:id", deleteUser);

// 

Router.post('/login', login);
Router.post("/update-password", auth, updatePassword);
module.exports = Router;