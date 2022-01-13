'use strict'
var Cita = require('../models/cita.js');

function list_citas(req, res) {
    Cita.find({}, (err, citas) => {
        if (err) {
            return res.status(500).send({ message: 'Error: Could not get citas!' });
        }
        res.status(200).send({ citas });
    }).populate({
        path: 'disponibilidad',
        populate: {
            path: 'especialista',
            populate: {
                path: 'especialidad'
            }
        }
    });
}


function new_cita(req, res) {
    try {
        let cita = new Cita();
        cita.rut = req.body.rut;
        cita.disponibilidad = req.body.disponibilidad;
        cita.save((err, citaSave) => {
            if (err) {
                return res.status(400).send({ message: `Error: Could not save cita to database!> ${err}` });
            }
            res.status(200).send({ cita: citaSave });
        });
    } 
    catch (error) {
        res.status(500).send({ message: `error: ` + error });
    }
}

function delete_cita(req, res) {
    let id = { '_id': req.params.id };
    Cita.deleteOne(id, (err, cita) => {
        if (err) {
            return res.status(400).send({ message: `Error: Could not delete cita from database!> ${err}` });
        }
        if (cita.deletedCount == 1) {
            res.status(200).send({ message: `Cita deleted!` });
        }
        else {
            res.status(400).send({ message: `Error: Cita could not be deleted!` });
        }
    });
}

module.exports = {
    list_citas,
    new_cita,
    delete_cita
};
