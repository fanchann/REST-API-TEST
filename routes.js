'use strict';


module.exports = (app) => {
    var message = require('./controller')

    app.route('/')
        .get(message.index)
        .post(message.tambahData)

    app.route('/views')
        .get(message.tampilData)

    app.route('/views/:id')
        .get(message.tampilDataById)

    app.route('/edit')
        .put(message.editMhsById)

    app.route('/hapus/:id_mahasiswa')
        .delete(message.hapusMahasiswa)
}