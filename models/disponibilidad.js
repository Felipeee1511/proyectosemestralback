'use strict'
const mongoose = require('mongoose');
const DisponibilidadSchema = mongoose.Schema({
    especialista: {
        type: mongoose.Schema.ObjectId, ref: "especialista",
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    horario: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = mongoose.model('disponibilidad', DisponibilidadSchema);
