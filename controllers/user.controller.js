const e = require("express");
const {User} = require("../models/user.model");

// getting all users
module.exports.getUsers = async(req,res)=>{
    try{
        let users = await User.find();
        if(users){return res.send({success:true,data:users}).status(200)}
        else return res.send({success:false,data:"Getting all users failed"}).status(404);
    }catch(e){res.send({status:true,data:e.message})}
}
// get the user by id
module.exports.getUser = async(req,res)=>{
    try{
        let user = await User.findById(req.params.id);
        if(user){return res.send({success:true,data:user}).status(200)}
        else return res.send({success:false,data:"User not found"}).status(404);
    }catch(e){return res.send({success:false,data:e.message})}
}
// create user
module.exports.createUser = async(req,res)=>{
    try{
        let emailChecker = await User.findOne({email:req.body.email});
        let phoneChecker = await User.findOne({phone:req.body?.phone});

        if(emailChecker){return res.send({success:false, data:"The email is being used by another user"}).status(400)}
        if(phoneChecker){return res.send({success:false, data:"The phone number is being used by another user"}).status(400)}
        
        let user = await User.create({...req.body});
        if(user){return res.send({success:false,message:"User created successfully",data:user}).status(201);}
        else return res.send({success:false,data:"User creation failed"}).status(400);
    }catch(e){return res.send({success:false,data:e.message})}
}
// update user 
module.exports.updateUser = async(req,res)=>{
    try{
        let user = await User.findById(req.params.id);
        if(user){
            // to troubleshoot
            let emailChecker = await User.findOne({email:req.body.email});
            console.log(emailChecker)
            let phoneChecker = await User.findOne({phone:req.body.phone});
            if(emailChecker?._id!==req.params.id){return res.send({success:false,data:"The email is in use by another account"}).status(400);}
            if(phoneChecker?._id!==req.params.id){return res.send({success:false,data:"The phone is in use by another account"}).status(400);}
            
            let newUser = await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
            if(newUser){res.send({success:true,message:"User account updated successfully",data:newUser}).status(201)}
            else return res.send({success:false,data:"Updating user account failed"}).status(400);
        }else return res.send({success:false,data:"User not found"}).status(404);
    }catch(e){return res.send({success:false,data:e.message})}
}
// activating and deactivating the user basing on the user status
module.exports.activDeactivateUser = async(req,res)=>{
    try{
        let user = await User.findById(req.params.id);
        if(user){ 
            let userStatus = user.status;
            if(userStatus === 'ACTIVE'){ userStatus='INACTIVE'}
            else userStatus = 'ACTIVE';
            let newUser = await User.findByIdAndUpdate(req.params.id,{status:userStatus},{new:true});
            if(newUser){return res.send({success:true,data:"Updating user status done successfully"}).status(201);}
            else return res.send({success:false,data:"Updating user status failed"}).status(400);
        }
    }catch(e){return res.send({success:false,data:e.message})}
}
//  delete permanently the user 
module.exports.deleteUser = async(req,res)=>{
    try{
        let user = await User.findByIdAndDelete(req.params.id);
        if(user){return res.send({success:true, data:"User deleted successfully"}).status(201);}
        else return res.send({success:false, data:"Deleting user failed"}).status(400);
    }catch(e){return res.send({success:false,data:e.message})}
}

