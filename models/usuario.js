'use strict'
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const UsuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean
    }
});

UsuarioSchema.pre('save', function(next) {
    const usuario = this;
    if (!usuario.isModified('pass')) {
        return next();
    }

    if (!usuario.hasOwnProperty('activo')) {
        usuario.activo = true;
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(usuario.pass, salt, null, (err, hash) => {
            if (err) {
                next(err);
            }
            usuario.pass = hash;
            next();
        });
    });
});

module.exports = mongoose.model('usuario', UsuarioSchema);
