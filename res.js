'use strict';
exports.ok = (values, response) => {
    var data = {
        'status': 200,
        'values': values
    };

    response.json(data);
    response.end();
}

//res for nested matkul
exports.oknested = (values, response) => {
    //check
    const check = values.reduce((answer, item) => {
        //create key group
        if (answer[item.nama]) {
            //create variabel
            const group = answer[item.nama];
            //check if array matkul
            if (Array.isArray(group.matakuliah)) {
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            answer[item.nama] = item;

        }
        return answer
    }, {});

    var data = {
        'status': 200,
        'values': check
    };
    response.json(data);
    response.end()
}