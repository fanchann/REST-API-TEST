'use strict';


module.exports = (app) => {
    var message = require('./controller')

    app.route('/')
        .get(message.index)

    app.route('/views')
        .get(message.tampilData)

    app.route('/views/:id')
        .get(message.tampilDataById)
}