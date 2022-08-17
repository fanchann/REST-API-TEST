const mysql = require('mysql');

//create connection
const data = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudmahasiswa'
}
const con = mysql.createConnection(data);


con.connect((err) => {
    if (err) {
        console.log('eror blok')
    } else {
        console.log(`Connected at ${data.database}`)
    }
})




module.exports = con;