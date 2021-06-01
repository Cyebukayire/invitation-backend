const express = require('express');
const {createWorkspace,getWorkspaces,getWorkspaceById,updateWorkspace,deleteWorkspace,workspaceStatusChange} = require('../controllers/workspace.controller');

const Router = express.Router();

Router.post('/create',createWorkspace);
Router.get('/get',getWorkspaces);
Router.get('/getOne/:id',getWorkspaceById);
Router.put('/update/:id',updateWorkspace);
Router.delete('/delete/:id',deleteWorkspace);
Router.put('/updateStatus/:id',workspaceStatusChange);

module.exports = Router;