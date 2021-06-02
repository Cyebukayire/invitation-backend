const express = require('express')
const {eventCat} = require('../models/eventCategory.model')

module.exports.createEventCat = async(req,res)=>{
    try {
        let eventcatChecker = await eventCat.findOne({cat_name:req.body.cat_name})
        if (eventcatChecker) {return res.send({success:false, data:"The name is being used by another category"}).status(400)}
        let eventcat = await eventCat.create({...req.body})
        if (eventcat) {return res.send({success:true,message:"event category created successfully",data:eventcat}).status(201);}
        else return res.send({success:false, data:"The name is being used by another category"}).status(400);
    } catch (error) {res.send({status:false,data:error.message})}
}
module.exports.getEventCat = async(req,res)=>{
    try{
        let eventcats = await eventCat.find();
        if(eventcats){return res.send({success:true,data:eventcats}).status(200)}
        else return res.send({success:false,data:"Getting all event categories failed"}).status(404);
    }catch(error){res.send({status:false,data:error.message})}
}

module.exports.getEventCatById = async(req,res)=>{
    try {
        let eventcat = await eventCat.findById(req.params.id);
        if (eventcat) {return res.send({success:true,data:eventcat}).status(200)
        }else return res.send({success:false,data:"getting event category failed"}).status(404);
    } catch (error) {res.send({status:false,data:error.message})}
}

module.exports.updateEventCat = async(req,res)=>{
    try {
        let eventcat = await eventCat.findById(req.params.id);
        if (eventcat) {
            let updatedEventcat = await eventCat.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
            if (updatedEventcat) {
                return res.send({success:true,message:"successfully updated event category",data:updatedEventcat}).status(201)}
                else return res.send({success:false,data:"failed to update event category"}).status(404);
            } 
    } catch (error) {res.send({status:false,data:error.message})}
}

module.exports.deleteEventCat = async(req,res)=>{
    try {
        let eventcat = await eventCat.findById(req.params.id);
        if (!eventcat) {return res.send({success:false,data:"event category not found"}).status(404)}
            let deletedEventcat = await eventCat.findByIdAndDelete(req.params.id)
            if (deletedEventcat) {
                return res.send({success:true,message:"successfully deleted event category",data:deletedEventcat}).status(201)}
            else return res.send({success:false,data:"failed to delete event category"}).status(404);

    } catch (error) {
        res.send({status:false,data:error.message})}
}

module.exports.changeEventCatStatus = async(req,res)=>{
    try {
        let eventcat = await eventCat.findById(req.params.id);
        if (eventcat) {
            let eventcatStatus = eventcat.status;
            if(eventcatStatus === 'ACTIVE'){ eventcatStatus='INACTIVE'}
            else eventcatStatus = 'ACTIVE';
            let neweventCatStatus = await eventCat.findByIdAndUpdate(req.params.id,{status:eventcatStatus},{new:true});
            if(neweventCatStatus){return res.send({success:true,message:"Updating event category status done successfully",data:neweventCatStatus}).status(201);}
            else return res.send({success:false,data:"Updating event category status failed"}).status(400);
        }
    } catch (error) {res.send({status:false,data:error.message})}
}