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


const tambahData = async (req, res) => {
    try {

        var nim = req.body.nim;
        var nama = req.body.nama;
        var jurusan = req.body.jurusan;

        connection.query(await `INSERT INTO mahasiswa (nim,nama,jurusan) VALUES(?,?,?)`, [nim, nama, jurusan],
            (err, views, fields) => {
                if (err) {
                    response.ok('Eror blok', res)
                } else {
                    response.ok("Berhasil menambahkan data", res)
                }
            }
        )
    } catch (err) {
        console.log(err)
    }

}


module.exports = {
    index,
    tampilData,
    tampilDataById,
    tambahData
}