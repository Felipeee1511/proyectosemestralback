'use strict'
var Usuario = require('../models/usuario.js');
const bcrypt = require('bcrypt-nodejs');
const service = require('../services/index')

function list_usuarios(req, res) {
    Usuario.find({}, (err, usuario) => {
        if (err) {
            return res.status(500).send({ message: 'Error: No se puede listar usuarios!' });
        }
        res.status(200).send({ usuario });
    });
}

function show_usuario(req, res) {
    let usuario_to_find = { 'mail': req.params.mail };
    Usuario.find(usuario_to_find, (err, usuario) => {
        if (err) {
            return res.status(500).send({ message: 'Error: No se puede listar usuario!' });
        }
        res.status(200).send({ usuario });
    });
}

function new_usuario(req, res) {
    try {
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.mail = req.body.mail;
        usuario.pass = req.body.pass;
        usuario.activo = req.body.activo;
        usuario.save((err, usuarioSave) => {
            if (err) {
                return res.status(400).send({ message: `Error: No se puede guardar usuario en database!> ${err}` });
            }
            res.status(200).send({ usuario: usuarioSave });
        });
    } 
    catch (error) {
        res.status(500).send({ message: `error: ` + error });
    }
}

function modify_usuario(req, res) {
    let usuario = new Usuario();
    usuario._id = req.params.id;
    usuario.activo = req.body.activo;
    Usuario.updateOne({ '_id': usuario._id }, usuario, (err, updatedUsuario) => {
        if (err) {
            return res.status(400).send({ message: `Error: No se puede guardar usuario en database!> ${err}` });
        }
        if (updatedUsuario.nModified == 1) {
            res.status(200).send({ message: `Usuario modificado!` });
        }
        else {
            res.status(400).send({ message: `Error: Usuario no puede ser modificado!` });
        }
    });
}

function delete_usuario(req, res) {
    let id = { '_id': req.params.id };
    Usuario.deleteOne(id, (err, usuario) => {
        if (err) {
            return res.status(400).send({ message: `Error: No se puede eliminar usuario de database!> ${err}` });
        }
        if (usuario.deletedCount == 1) {
            res.status(200).send({ message: `Usuario deleted!` });
        }
        else {
            res.status(400).send({ message: `Error: Usuario no puede ser eliminado` });
        }
    });
}


function validar_usuario(req, res) {
    var password = req.body.pass;
    Usuario.findOne({'mail': req.body.mail}, (err, user) => {
        if (err) {
            return res.status(500).send({ mensaje: 'error al realizar la peticion' });
        }
        if (!user) {
            return res.status(401).send({ mensaje: 'Error: usuario inexistente' });
        }

        if (!user.activo) {
            return res.status(401).send({ 'mensaje': 'usuario inactivo'});
        }

        bcrypt.compare(password, user.pass, function(error, isMatch) {
            if (error) {
                res.status(500).send(`Error al validar usuario> ${error}`);
            }
            else if (!isMatch) {
                res.status(401).send({ 'mensaje': 'incorrecto'});
            }
            else {
                
            res.status(200).send({ 'mensaje': 'correcto', 'token': service.createToken(user)});
            
            }
        });
    });
}


const validar_vigencia = (req, res) =>{
    Usuario.findById(req.usuario, function (err, usuario) {
        if (err) {
            return res.status(401).send({'mensaje': 'usuario no autorizado'});
        }

        if (!usuario.activo) {
            return res.status(401).send({'mensaje': 'usuario no es activo'});
        }

        return res.status(200).send({'usuario': usuario.mail});
    });
}


module.exports = {
    list_usuarios,
    show_usuario,
    new_usuario,
    modify_usuario,
    delete_usuario,
    validar_usuario,
    validar_vigencia
};
