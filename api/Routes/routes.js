const { Router } = require('express');
const router = Router();

// Controllers
const UserController = require('../Controllers/UserController');
const AuthController = require('../Controllers/AuthController');
const TaskController = require('../Controllers/TaskController');

// Middlewares
const isAuthenticated = require('../Middlewares/isAuthenticated')
const verifyEmail = require('../Middlewares/Register/verifyEmail')
const verifyEmptyFields = require('../Middlewares/Register/verifyEmptyFields')

router.post('/register', verifyEmptyFields, verifyEmail, UserController.create);
router.post('/login', AuthController.login);

router.get('/users', isAuthenticated, UserController.all);
router.get('/users/:id', isAuthenticated, UserController.find);
router.put('/users/:id', isAuthenticated, UserController.update);
router.delete('/users/:id', isAuthenticated, UserController.delete);

router.get('/tasks', TaskController.all);
router.post('/tasks', isAuthenticated, TaskController.create);
router.get('/tasks/:id', isAuthenticated, TaskController.find);
router.put('/tasks/:id', isAuthenticated, TaskController.update);
router.delete('/tasks/:id', isAuthenticated, TaskController.delete);
router.get('/tasks/users/:userId', isAuthenticated, TaskController.getUserTasks);

router.get('/auth/user', isAuthenticated, AuthController.userAuth);

module.exports = router;