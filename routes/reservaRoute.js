'use strict'
var express = require('express');

var disponibilidadController = require('../controllers/disponibilidadController');
const auth = require('../middlewares/auth');

var api = express.Router();

api.get('/disponibilidad', disponibilidadController.list_disponibilidades);
api.get('/disponibilidad/especialista/:id', disponibilidadController.list_disponibilidades_especialista);
api.get('/disponibilidad/:id', disponibilidadController.show_disponibilidad);
api.post('/disponibilidad', auth.isAuth, disponibilidadController.new_disponibilidad);
api.put('/disponibilidad/:id', disponibilidadController.modify_disponibilidad);
api.delete('/disponibilidad/:id', auth.isAuth, disponibilidadController.delete_disponibilidad);
api.delete('/disponibilidad', auth.isAuth, disponibilidadController.delete_disponibilidades);

module.exports = api;
