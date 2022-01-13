'use strict'
var Especialidad = require('../models/especialidad.js');

function list_especialidades(req, res) {
    Especialidad.find({}, (err, especialidades) => {
        if (err) {
            return res.status(500).send({ message: 'Error: Could not get especialidades!' });
        }
        res.status(200).send({ especialidades });
    });
}

function show_especialidad(req, res) {
    let id = { '_id': req.params.id };
    Especialidad.findOne(id, (err, especialidad) => {
        if (err) {
            return res.status(500).send({ message: 'Error: Could not get especialidad!' });
        }
        res.status(200).send({ especialidad });
    });
}

function new_especialidad(req, res) {
    try {
        let especialidad = new Especialidad();
        especialidad.descripcion = req.body.descripcion;
        especialidad.save((err, especialidadSave) => {
            if (err) {
                return res.status(400).send({ message: `Error: Could not save especialidad to database!> ${err}` });
            }
            res.status(200).send({ especialidad: especialidadSave });
        });
    } 
    catch (error) {
        res.status(500).send({ message: `error: ` + error });
    }
}

function delete_especialidad(req, res) {
    let id = { '_id': req.params.id };
    Especialidad.deleteOne(id, (err, especialidad) => {
        if (err) {
            return res.status(400).send({ message: `Error: Could not delete especialidad from database!> ${err}` });
        }
        if (especialidad.deletedCount == 1) {
            res.status(200).send({ message: `Especialidad deleted!` });
        }
        else {
            res.status(400).send({ message: `Error: Especialidad could not be deleted!` });
        }
    });
}

module.exports = {
    list_especialidades,
    show_especialidad,
    new_especialidad,
    delete_especialidad
};
