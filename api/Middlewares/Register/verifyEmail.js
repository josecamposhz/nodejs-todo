const User = require('../../Models/User')

verifyEmail = (req, res, next) => {
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // Se valida si el email ingresado es correcto
    if (emailRegExp.test(req.body.email)) {
        // Se verifica si el email ingresado ya existe en la base de datos
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                return res.status(500).send({ error: 'El correo ingresado ya se encuentra en nuestros registros.' })
            } else {
                next();
            }
        })
    } else {
        return res.status(500).send({ error: 'Correo invalido.' })
    }
}

module.exports = verifyEmail;