const express = require('express');
const auth = require('./auth');
const app = express.Router();


//add regist

app.post('/api/v1/register', auth.registrasi)



module.exports = app;