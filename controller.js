'use strict';


const response = require('./res');
const connection = require('./connect');


const index = (req, res) => {
    response.ok('REST API running', res);
}

//views all mahasiswa
const tampilData = (req, res) => {
    connection.query(`SELECT * FROM mahasiswa`, (err, views, fields) => {
        if (err) {
            connection.log(err)
        } else {
            response.ok(views, res)
        }
    })
}

const tampilDataById = (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT * FROM mahasiswa WHERE id_mahasiswa = ?`, id, (err, views, fields) => {
        if (err) {
            console.log(err)
        } else {
            response.ok(views, res)
        }
    })
}


module.exports = {
    index,
    tampilData,
    tampilDataById
}