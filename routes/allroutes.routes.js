const express = require('express')
const {createEventCat,getEventCat,getEventCatById,updateEventCat,deleteEventCat,changeEventCatStatus} = require('../controllers/eventCategory.controller');
const Router = express.Router();

Router.post('/eventcat/create',createEventCat);
Router.get('/eventcat/get',getEventCat);
Router.get('/eventcat/getOne/:id',getEventCatById);
Router.put('/eventcat/update/:id',updateEventCat);
Router.delete('/eventcat/delete/:id',deleteEventCat);
Router.put('/eventcat/changeStatus/:id',changeEventCatStatus);



module.exports = Router;