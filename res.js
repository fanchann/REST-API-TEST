'use strict';

exports.ok = (values, response) => {
    var data = {
        'status': 200,
        'values': values
    };

    response.json(data);
    response.end()
}