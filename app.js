const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const middleware = require('./middleware/index')
const app = express();
const port = 3001


//parse application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));


//Panggil routes
const routes = require('./routes');
routes(app)


//regist routes index

app.use('/auth', middleware)

app.listen(port, () => {
    console.log(`Server running in localhost:${port}`)
})