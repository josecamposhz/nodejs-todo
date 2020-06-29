const { Router } = require('express');
const router = Router();

// Controllers
const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/AuthController');

// Middlewares
const isAuthenticated = require('../Middlewares/isAuthenticated')
const verifyEmail = require('../Middlewares/Register/verifyEmail')
const verifyEmptyFields = require('../Middlewares/Register/verifyEmptyFields')

router.post('/users', verifyEmptyFields, verifyEmail, UserController.create);
router.get('/users', UserController.all);
router.get('/users/:id', UserController.find);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

router.post('/auth/login', AuthController.login);
router.get('/auth/user', isAuthenticated, AuthController.userAuth);

module.exports = router;