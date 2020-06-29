// Recibe un rol
const HasRole = role => (req, res, next) => {
    if (req.user.rol === role) {
        return next()
    }
    res.sendStatus(403)
}

// Recibe un arreglo de roles
const HasRoles = roles => (req, res, next) => {
    if (roles.indexOf(req.user.role)) {
        return next()
    }
    res.sendStatus(403)
}

module.exports = { HasRole, HasRoles }