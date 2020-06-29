verifyEmptyFields = (req, res, next) => {
    if (req.body.first_name === '') {
        return res.status(400).send({ error: 'El campo Nombre es requerido.' })
    } else if (req.body.last_name === '') {
        return res.status(400).send({ error: 'El campo Apellidos es requerido.' })
    } else if (req.body.password === '') {
        return res.status(400).send({ error: 'El campo contraseña es requerido.' })
    } else if (req.body.password.length < 4) {
        return res.status(400).send({ error: 'La contraseña debe tener a lo menos 4 caracteres.' })
    } else {
        next();
    }
}

module.exports = verifyEmptyFields