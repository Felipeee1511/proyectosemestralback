'use strict'
var express = require('express');

var especialidadController = require('../controllers/especialidadController');
const auth = require('../middlewares/auth');

var api = express.Router();

api.get('/especialidad', especialidadController.list_especialidades);
api.get('/especialidad/:id', especialidadController.show_especialidad);
api.post('/especialidad', auth.isAuth, especialidadController.new_especialidad);
api.delete('/especialidad/:id', auth.isAuth, especialidadController.delete_especialidad);

module.exports = api;
