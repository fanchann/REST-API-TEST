var connection = require('../connect');
var mysql = require('mysql');
var md5 = require('sha1');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');



//controller for register

const registrasi = (req, res) => {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date(),
    };
    console.log(post)

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", 'email', post.email];

    query = mysql.format(query, table);


    connection.query(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO user SET ?";

                query = mysql.format(query, post);
                connection.query(query, table, (err, rows) => {
                    if (err) {
                        response.ok(err, res)
                    } else {
                        response.ok("Berhasil tambah data", res)
                    }
                });
            } else {
                response.ok("Email sudah terdaftar!", res)
            }
        }
    })

}



//Controller login

const login = (req, res) => {
    var post = {
        email: req.body.email,
        password: req.body.password
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", (post.email)];

    query = mysql.format(query, table);
    connection.query(query, (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({
                    rows
                }, config.secret, {
                    expiresIn: 1440
                });
                var id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    acces_token: token,
                    ip_address: ip.address()
                }
                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, (err, rows) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json({
                            succes: true,
                            message: "Token generated!",
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else {
                res.json({
                    "Error": true,
                    "message": "email atau pasword salah!"
                })
            }
        }
    })

}


const secretPage = (req, res) => {
    response.ok("This page for role 2!", res)
}


module.exports = {
    registrasi,
    login,
    secretPage
}