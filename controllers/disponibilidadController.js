'use strict'
var Disponibilidad = require('../models/disponibilidad.js');

function list_disponibilidades(req, res) {
    Disponibilidad.find({}, (err, disponibilidades) => {
        if (err) {
            return res.status(500).send({ message: 'Error: Could not get disponibilidades!' });
        }
        res.status(200).send({ disponibilidades });
    }).populate({
        path: 'especialista',
        populate: {
            path: 'especialidad'
        }
    });
}

function list_disponibilidades_especialista(req, res) {
    let especialista = { 'especialista': req.params.id };
    Disponibilidad.find(especialista, (err, disponibilidades) => {
        if (err) {
            return res.status(500).send({ message: 'Error: Could not get disponibilidades!' });
        }
        res.status(200).send({ disponibilidades });
    }).populate({
        path: 'especialista',
        populate: {
            path: 'especialidad'
        }
    }).sort(
        {
            fecha: 1,
            horario: 1
        }
    );
}

function show_disponibilidad(req, res) {
    let id = { '_id': req.params.id };
    Disponibilidad.findOne(id, (err, disponibilidad) => {
        if (err) {
            return res.status(500).send({ message: 'Error: Could not get disponibilidad!' });
        }
        res.status(200).send({ disponibilidad });
    }).populate({
        path: 'especialista',
        populate: {
            path: 'especialidad'
        }
    });
}

function new_disponibilidad(req, res) {
    try {
        let disponibilidades = req.body;
        
        
            for (let i = 0; i < disponibilidades.length; i++) {
                
                let disponibilidad = new Disponibilidad();
                disponibilidad.especialista = disponibilidades[i].especialista;
                disponibilidad.fecha = disponibilidades[i].fecha;
                disponibilidad.horario = disponibilidades[i].horario;
                disponibilidad.save((err) => {
                    if (err) {
                        return res.status(400).send({ message: `Error: Could not save disponibilidades to database!> ${err}` });
                    }
                });
            }
            res.status(200).send({ message: 'Disponibilidades saved!' });
        
        
    } 
    catch (error) {
        res.status(500).send({ message: `error: ` + error });
    }
}

function modify_disponibilidad(req, res) {
    let disponibilidad = new Disponibilidad();
    disponibilidad._id = req.params.id;
    disponibilidad.disponible = req.body.disponible;
    Disponibilidad.updateOne({ '_id': req.params.id }, disponibilidad, (err, disponibilidad) => {
        if (err) {
            return res.status(400).send({ message: `Error: Could not save disponibilidad to database!> ${err}` });
        }
        if (disponibilidad.nModified == 1) {
            res.status(200).send({ message: `Disponibilidad modified!` });
        }
        else {
            res.status(400).send({ message: `Error: Disponibilidad could not be modified!` });
        }
    });
}

function delete_disponibilidad(req, res) {
    let id = { '_id': req.params.id };
    Disponibilidad.deleteOne(id, (err, disponibilidad) => {
        if (err) {
            return res.status(400).send({ message: `Error: Could not delete disponibilidad from database!> ${err}` });
        }
        if (disponibilidad.deletedCount == 1) {
            res.status(200).send({ message: `Disponibilidad deleted!` });
        }
        else {
            res.status(400).send({ message: `Error: Disponibilidad could not be deleted!` });
        }
    });
}

function delete_disponibilidades(req, res) {
    Disponibilidad.deleteMany({}, (err, disponibilidad) => {
        if (err) {
            return res.status(400).send({ message: `Error: Could not delete disponibilidades from database!> ${err}` });
        }
        if (disponibilidad.deletedCount >= 1) {
            res.status(200).send({ message: `Disponibilidades deleted!` });
        }
        else {
            res.status(400).send({ message: `Error: Disponibilidades could not be deleted!` });
        }
    });
}

module.exports = {
    list_disponibilidades,
    list_disponibilidades_especialista,
    show_disponibilidad,
    new_disponibilidad,
    modify_disponibilidad,
    delete_disponibilidad,
    delete_disponibilidades
};
