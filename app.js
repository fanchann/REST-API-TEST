const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3001


//parse application/json
bodyParser.urlencoded({
    extended: true
});
app.use(bodyParser.json());


//Panggil routes
const routes = require('./routes');
routes(app)

app.listen(port, () => {
    console.log(`Server running in localhost:${port}`)
})