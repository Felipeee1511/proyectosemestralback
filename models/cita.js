'use strict'
const mongoose = require('mongoose');
const CitaSchema = mongoose.Schema({
    rut: {
        type: String,
        required: true
    },
    
    disponibilidad: {
        type: mongoose.Schema.ObjectId, ref: "disponibilidad",
        required:  true
    }
});

module.exports = mongoose.model('cita', CitaSchema);
