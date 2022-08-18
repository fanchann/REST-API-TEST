const connection = require('../connect');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res.js');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');


//controller for register

const registrasi = (req, res) => {
    const post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var checkEmail = `SELECT email FROM ?? WHERE ??`;
    const checkData = ["user", "email", post.email];

    checkEmail = mysql.format(checkEmail, checkData);


    connection.query(checkEmail, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            if (rows.length == 0) {
                var query = `INSERT INTO ?? SET ?`;
                var post = ["user"];

                query = mysql.format(query, post);
                connection.query(query, post, (err, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        response.ok("Berhasil tambah data", res)
                    }
                });
            } else {
                response.ok("Email sudah terdaftar!")
            }
        }
    })

}