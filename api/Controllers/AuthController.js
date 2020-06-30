const AuthController = {};

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const signToken = (_id) => {
    return jwt.sign({ _id }, 'secret', {
        expiresIn: 60 * 60 * 24 // Expira en 24 horas
    })
}

AuthController.login = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }).exec().then(user => {
        if (!user) {
            return res.status(404).send({ error: 'Usuario no encontrado' })
        }

        bcrypt.compare(password, user.password, (err, decrypt) => {
            if (err) {
                return res.status(500).send(err.message)
            }

            if (decrypt) {
                user.password = undefined // quitamos la contraseña de la respuesta a devolver
                const token = signToken(user._id)
                return res.send({ user: user, token: token })
            } else {
                return res.status(500).send({ error: 'Contraseña incorrecta' });
            }
        })

    })
}

AuthController.userAuth = (req, res) => {
    res.send(req.user)
}

module.exports = AuthController;