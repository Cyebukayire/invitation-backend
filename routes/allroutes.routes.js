const express = require('express')
const {createEventCat,getEventCat} = require('../controllers/eventCategory.controller');
const Router = express.Router();

Router.post('/eventcat/create',createEventCat);
Router.get('/eventcat/get',getEventCat);



module.exports = Router;