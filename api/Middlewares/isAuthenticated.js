const Users = require('../Models/Users')
const jwt = require('jsonwebtoken')

isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization
    // Se verifica si el request posee el headers authorization
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(500).send({ error: err })
        }
        const { _id } = decoded
        Users.findOne({ _id }).exec().then(user => {
            req.user = user
            return next()
        })
    })
}

module.exports = isAuthenticated