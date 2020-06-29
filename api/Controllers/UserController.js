const UserController = {};
const bcrypt = require('bcryptjs')

const User = require('../Models/User')

//Para encriptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

UserController.create = async (req, res) => {
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt) // Se encripta la contraseña
    })

    User.create(newUser).then(() => {
        res.status(201).send('Registro exitoso')
    }).catch(error => {
        res.status(500).send({'error': error});
    })
}

// Retorna todos los usuarios registrados
UserController.all = async (req, res) => {
    User.find().exec().then(users => res.send(users))
}

UserController.find = (req, res) => {
    Users.findById(req.params.id)
        .exec()
        .then(user => {
            res.status(200).send(user)
        })
}

UserController.update = (req, res) => {
    Users.findByIdAndUpdate(req.paramas.id, req.body)
        .then(user => res.status(200).send(user))
}

UserController.delete = (req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .exec()
        .then( () => {
            res.sendStatus(204)
        })
}

module.exports = UserController;