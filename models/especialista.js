'use strict'
const mongoose = require('mongoose');
const EspecialistaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especialidad: { 
        type: mongoose.Schema.ObjectId, ref: "especialidad",
        required: true
    }
});

module.exports = mongoose.model('especialista', EspecialistaSchema);
