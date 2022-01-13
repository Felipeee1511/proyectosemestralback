'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

function isAuth(req, res, next) {
    // if (!req.headers.authorization) {
    //     return res.status(403).send({ message: 'No tienes autorización, token invalido' });
    // }

    // const token = req.headers.authorization.split(" ")[1]
    // console.log(token);
    // try {
    //     const payload = jwt.decode(token, process.env.SECRET_TOKEN);

    //     if (payload.exp < moment().unix()) {
    //         return res.status(401).send({ message: 'El token expiró' });
    //     }

    //     req.usuario = payload.sub
    // }
    // catch (err) {
    //     return res.status(401).send({ message: 'El token es invalido' });
    // }
     next();
}

module.exports = {
    isAuth
};
