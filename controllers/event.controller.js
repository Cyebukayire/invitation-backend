const express = require('express')
const {Event} = require('../models/event.model')

module.exports.createEvent = async(req,res)=>{
    try {
        let eventChecker = await Event.findOne({event_name:req.body.event_name});
        if (eventChecker) {return res.send({success:false, data:"The name is being used by another category"}).status(400)}
        let event = await Event.create({...req.body})
        if (event) {return res.send({success:true,message:"event created successfully",data:event}).status(201)}
        else return res.send({success:false,data:"failed to create event"}).status(400)
    } catch (error) {res.send({status:false,data:error.message})}
}

module.exports.getEvents = async(req,res)=>{
    try {
        let event = await Event.find()
        if (event) {return res.send({success:true,data:event}).status(200)} 
        else return res.send({success:false,data:"couldnt get events"}).status(404)
    } catch (error) {res.send({status:false,data:error.message})}
}

module.exports.getEventById = async(req,res)=>{
    try {
        let event = await Event.findById(req.params.id)
        if (event) {return res.send({success:true,data:event}).status(200)} 
        else return res.send({success:false,data:"failed to get event"}).status(404)
    } catch (error) {res,send({status:false,data:error.message})}
}

module.exports.updateEvent = async(req,res)=>{
try {
    let event = await Event.findById(req.params.id)
    if (event) {
        let eventToUpdate = await Event.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        if (eventToUpdate) {
            return res.send({success:true,message:"Event updated successfully",data:eventToUpdate}).status(201)
        } else return res.send({success:false,data:"failed to update event"}).status(404);
    }

} catch (error) {res.send({status:false,data:error.message})}
}

module.exports.deleteEvent = async(req,res)=>{
try {
    let event = await Event.findById(req.params.id)
    if (event) {
        let eventToDelete = await Event.findByIdAndDelete(req.params.id)
        if (eventToDelete) {return res.send({success:true,message:"Successfully deleted event",data:eventToDelete}).status(201)}
        else return res.send({success:false,data:"failed to delete event"}).status(404);
    }
} catch (error) {res.send({status:false,data:error.message})}
}

