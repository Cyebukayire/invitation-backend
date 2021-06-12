const express = require('express')
const {createEventCat,getEventCat,getEventCatById,updateEventCat,deleteEventCat,changeEventCatStatus} = require('../controllers/eventCategory.controller');
const {createEvent,getEvents,getEventById,updateEvent,deleteEvent} = require('../controllers/event.controller');
const Router = express.Router();

Router.post('/eventcat/create',createEventCat);
Router.get('/eventcat/get',getEventCat);
Router.get('/eventcat/getOne/:id',getEventCatById);
Router.put('/eventcat/update/:id',updateEventCat);
Router.delete('/eventcat/delete/:id',deleteEventCat);
Router.put('/eventcat/changeStatus/:id',changeEventCatStatus);

Router.post('/event/create',createEvent);
Router.get('/event/get',getEvents);
Router.get('/event/getOne/:id',getEventById);
Router.put('/event/update/:id',updateEvent);
Router.delete('/event/delete/:id',deleteEvent);

module.exports = Router;