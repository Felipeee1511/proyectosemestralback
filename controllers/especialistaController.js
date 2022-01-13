'use strict'
var Especialista = require('../models/especialista.js');

function list_especialistas(req, res) {
    Especialista.find({}, (err, especialistas) => {
        if (err) {
            return res.status(500).send({ message: 'Error: no se puede listar especialistas!' });
        }
        res.status(200).send({ especialistas });
    }).populate('especialidad');
}

function list_especialistas_especialidad(req, res) {
    let especialidad = { 'especialidad': req.params.id };
    Especialista.find(especialidad, (err, especialistas) => {
        if (err) {
            return res.status(500).send({ message: 'Error: no se puede listar especialistas!' });
        }
        res.status(200).send({ especialistas });
    }).populate('especialidad');
}

function show_especialista(req, res) {
    let id = { '_id': req.params.id };
    Especialista.findOne(id, (err, especialista) => {
        if (err) {
            return res.status(500).send({ message: 'Error: no se puede listar especialista!' });
        }
        res.status(200).send({ especialista });
    }).populate('especialidad');
}

function new_especialista(req, res) {
    try {
        let especialista = new Especialista();
        especialista.nombre = req.body.nombre;
        especialista.especialidad = req.body.especialidad;
        especialista.save((err, especialistaSave) => {
            if (err) {
                return res.status(400).send({ message: `Error: no se puede guardar especialista en database!> ${err}` });
            }
            res.status(200).send({ especialista: especialistaSave });
        });
    } 
    catch (error) {
        res.status(500).send({ message: `error: ` + error });
    }
}

function delete_especialista(req, res) {
    let id = { '_id': req.params.id };
    Especialista.deleteOne(id, (err, especialista) => {
        if (err) {
            return res.status(400).send({ message: `Error: no se puede eliminar especialista en database!> ${err}` });
        }
        if (especialista.deletedCount == 1) {
            res.status(200).send({ message: `Especialista eliminado!` });
        }
        else {
            res.status(400).send({ message: `Error: Especialista no puede ser eliminado` });
        }
    });
}

module.exports = {
    list_especialistas,
    list_especialistas_especialidad,
    show_especialista,
    new_especialista,
    delete_especialista
};
