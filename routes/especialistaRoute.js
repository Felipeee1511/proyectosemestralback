'use strict'
var express = require('express');

var especialistaController = require('../controllers/especialistaController');
const auth = require('../middlewares/auth');

var api = express.Router();

api.get('/especialista', especialistaController.list_especialistas);
api.get('/especialista/especialidad/:id', especialistaController.list_especialistas_especialidad);
api.get('/especialista/:id', especialistaController.show_especialista);
api.post('/especialista', auth.isAuth, especialistaController.new_especialista);
api.delete('/especialista/:id', auth.isAuth, especialistaController.delete_especialista);

module.exports = api;
