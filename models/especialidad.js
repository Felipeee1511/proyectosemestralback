'use strict'
const mongoose = require('mongoose');
const EspecialidadSchema = mongoose.Schema({
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('especialidad', EspecialidadSchema);
