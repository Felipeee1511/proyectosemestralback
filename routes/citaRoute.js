'use strict'
var express = require('express');

var citaController = require('../controllers/citaController');
const auth = require('../middlewares/auth');

var api = express.Router();

api.get('/cita', citaController.list_citas);
api.post('/cita', citaController.new_cita);
api.delete('/cita/:id', auth.isAuth, citaController.delete_cita);

module.exports = api;
