'use strict'
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var cors = require('cors');
app.use(cors());
app.options('*', cors());

var usuario_route = require('./routes/userRoute');
var especialidad_route = require('./routes/especialidadRoute');
var especialista_route = require('./routes/especialistaRoute');
var disponibilidad_route = require('./routes/reservaRoute');
var cita_route = require('./routes/citaRoute');

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', usuario_route);
app.use('/api', especialidad_route);
app.use('/api', especialista_route);
app.use('/api', disponibilidad_route);
app.use('/api', cita_route);

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true,
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useFindAndModify: false,
    useUnifiedTopology: true
}

mongoose.connect(`mongodb://localhost:27017/tallerdata`, options)
    .then(() => console.log('> Successfully connected to DB'))
    .catch(err => console.log(err));

app.listen(4000, () => {
    console.log('> Service running on port 4000');
})

module.exports = app;
