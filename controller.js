'use strict';


const response = require('./res');
const connection = require('./connect');

exports.index = (req, res) => {
    response.ok('REST API running', res);
}

//views all mahasiswa
exports.tampilData = (req, res) => {
    connection.query(`SELECT * FROM mahasiswa`, (err, views, fields) => {
        if (err) {
            connection.log(err)
        } else {
            response.ok(views, res)
        }
    })
}