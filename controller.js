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


const editMhsById = (req, res) => {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query(`UPDATE mahasiswa SET nim=?,nama=?,jurusan=? WHERE id_mahasiswa=?`, [nim, nama, jurusan, id],
        (err, views, fields) => {
            if (err) {
                console.log(err)
            } else {
                response.ok("Berhasil ubah data", res)
            }
        });
}

//delete 
const hapusMahasiswa = function(req, res) {
    var id = req.params.id_mahasiswa;

    connection.query(`DELETE FROM mahasiswa WHERE id_mahasiswa=?`, [id],
        function(error, rows, fields) {
            if (error) {
                console.log(error);
            } else if (id == undefined) {
                response.ok('Lah kok!', res)
            } else {
                response.ok("Berhasil Hapus Data", res)
                console.log(id)
            }
        });
}


//views group

const tampilAll = (req, res) => {
    const join = `SELECT mahasiswa.id_mahasiswa,mahasiswa.nim,mahasiswa.nama,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matkul AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa;`
    connection.query(join, (err, rows, fields) => {
        if (err) {
            console.log(err)
        } else {
            response.oknested(rows, res)
        }
    })
}


module.exports = {
    index,
    tampilData,
    tampilDataById,
    tambahData,
    editMhsById,
    hapusMahasiswa,
    tampilAll
}