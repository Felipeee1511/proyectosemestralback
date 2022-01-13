'use strict'
var express = require('express');

var usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');

var api = express.Router();

api.get('/usuario', auth.isAuth, usuarioController.list_usuarios);
api.post('/usuario', auth.isAuth, usuarioController.new_usuario);
api.put('/usuario/:id', auth.isAuth, usuarioController.modify_usuario);
api.delete('/usuario/:id', auth.isAuth, usuarioController.delete_usuario);
api.post('/usuario/validar', usuarioController.validar_usuario);
api.post('/usuario/vigencia', auth.isAuth, usuarioController.validar_vigencia);

module.exports = api;
