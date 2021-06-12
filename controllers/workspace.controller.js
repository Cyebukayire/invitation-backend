const express = require('express');
const {WorkSpace} = require('../models/workspace.model');

// creating workspace

module.exports.createWorkspace = async(req,res)=>{
    try {
        let nameChecker = await WorkSpace.findOne({wspace_name:req.body.wspace_name});
        
        if(nameChecker){return res.send({success:false, data:"The name is being used by another workspace"}).status(400)}

        let workspace = await WorkSpace.create({...req.body});
        if(workspace){return res.send({success:true,message:"workspace created successfully",data:workspace}).status(201);}
        else return res.send({success:false,data:"Workspace creation failed"}).status(400);
        
    } catch (error) {
        res.send({status:false,data:error.message})
    }
}

// getting all workspaces

module.exports.getWorkspaces = async(req,res)=>{
    try {
        let workspaces = await WorkSpace.find();
        if(workspaces){return res.send({success:true,data:workspaces}).status(200)}
        else return res.send({success:false,data:"Getting all workspaces failed"}).status(404);
    } catch (error) {
        res.send({status:false,data:error.message})
    }
}

// getting workspace by id
module.exports.getWorkspaceById = async(req,res)=>{
    try {
        let workspace = await WorkSpace.findById(req.params.id);
        if(workspace){return res.send({success:true,data:workspace}).status(200)}
        else return res.send({success:false,data:"Getting workspace failed"}).status(404);
    } catch (error) {
        res.send({status:false,data:error.message})
    }
}

// updating workspace
module.exports.updateWorkspace = async(req,res)=>{
    try {
        let workspace = await WorkSpace.findById(req.params.id);
        if(workspace){

        // let nameChecker = await WorkSpace.findOne({wspace_name:req.body.wspace_name});
        // if(nameChecker._id!==req.params.id){return res.send({success:false, data:"The name is being used by another workspace"}).status(400)}

        let updatedWorkspace = await WorkSpace.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        if(updatedWorkspace){
            res.send({success:true,message:"Workspace updated successfully",data:updatedWorkspace}).status(201)}
            else return res.send({success:false,data:"Updating workspace failed"}).status(400);
        }else return res.send({success:false,data:"workspace not found"}).status(404);
        
    } catch (error) {res.send({status:false,data:error.message})
        }

}

// deleting workspace
module.exports.deleteWorkspace = async(req,res)=>{
    try {
        let workspace = await WorkSpace.findById(req.params.id);
        if(!workspace){return res.send({success:false,data:"workspace not found"}).status(404)}
        let wSpaceDelete = await WorkSpace.findByIdAndRemove(req.params.id);
        if(wSpaceDelete){
         return res.send({success:true,message:"Workspace deleted successfully",data:wSpaceDelete}).status(201)}
        else return res.send({success:false,data:"deleting workspace failed"}).status(400);
    } catch (error) {
        res.send({status:false,data:error.message})
    }
}

// change workspace status
module.exports.workspaceStatusUpdate = async(req,res)=>{
    try{
        let workspace = await WorkSpace.findById(req.params.id);
        if(workspace){ 
            let status = workspace.wStatus;
            if(status === 'ACTIVE'){ status='INACTIVE'}
            else status = 'ACTIVE';
            console.log(status);
            let neWspaceStatus = await WorkSpace.findByIdAndUpdate(req.params.id,{wStatus:status},{new:true});
            if(neWspaceStatus){return res.send({success:true,message:"Updating workspace status done successfully",data:neWspaceStatus}).status(201);}
            else return res.send({success:false,data:"Updating workspace status failed"}).status(400);
        }
    }catch(error){return res.send({success:false,data:error.message})}
}
