const express = require('express')
const {EventCat} = require('../models/eventCategory.model')

module.exports.createEventCat = async(req,res)=>{
    try {
        let eventcatChecker = await EventCat.findOne({cat_name:req.body.cat_name})
        if (eventcatChecker) {return res.send({success:false, data:"The name is being used by another category"}).status(400)}
        let eventcat = await EventCat.create({...req.body})
        if (eventcat) {return res.send({success:true,message:"event category created successfully",data:eventcat}).status(201);}
        else return res.send({success:false, data:"The name is being used by another category"}).status(400);
    } catch (error) {
        res.send({status:false,data:error.message})
    }
}
module.exports.getEventCat = async(req,res)=>{
    try{
        let eventcats = await EventCat.find();
        if(eventcats){return res.send({success:true,data:eventcats}).status(200)}
        else return res.send({success:false,data:"Getting all event categories failed"}).status(404);
    }catch(error){res.send({status:true,data:error.message})}
}