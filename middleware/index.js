const express = require('express');
const auth = require('./auth');
const verifikasi = require('./verif');
const app = express.Router();


//add regist
app.post('/api/v1/register', auth.registrasi);
app.post('/api/v1/login', auth.login)


//authPage
app.get('/api/v1/secretPage', verifikasi(), auth.secretPage)



module.exports = app;