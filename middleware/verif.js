const jwt = require('jsonwebtoken');
const secret = require('../config/secret');


function verifikasi() {
    return function(req, res, next) {
        const role = req.body.role;
        //checking auth header
        const tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            const token = tokenWithBearer.split(' ')[1];
            //verification
            jwt.verify(token, secret.secret, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        auth: false,
                        message: "Token Expired"
                    })
                } else {
                    if (role == 2) {
                        req.auth = decoded;
                        next()
                    } else {
                        return res.status(401).send({
                            auth: false,
                            message: "Eror with your role"
                        })
                    }

                }
            })
        } else {
            return res.status(401).send({
                auth: false,
                message: "Token not signed!"
            })
        }
    }
}

module.exports = verifikasi;