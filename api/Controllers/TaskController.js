const TaskController = {};

const Task = require('../Models/Task')

TaskController.create = async (req, res) => {
    const newTask = new Task({
        description: req.body.description,
        priority: req.body.priority,
        user: req.body.user
    })

    Task.create(newTask).then(() => {
        res.status(201).send('Tarea creada con exito')
    }).catch(error => {
        res.status(500).send({ 'error': error });
    })
}

// Retornamos todas las tareas
TaskController.all = async (req, res) => {
    Task.find().exec().then(tasks => res.send(tasks))
}

// Retornamos una tarea especifica
TaskController.find = (req, res) => {
    Task.findById(req.params.id)
        .exec()
        .then(user => {
            res.status(200).send(user)
        })
}

// Actualizamos una tarea
TaskController.update = (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.status(200).send(user))
        .catch(error => {
            res.status(500).send({ 'error': error });
        })
}

// Eliminamos una tarea
TaskController.delete = (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => {
            res.sendStatus(204)
        })
}

// Retornamos todas las tareas de un usuario
TaskController.getUserTasks = async (req, res) => {
    Task.find({ user: req.params.userId }).sort( { createdAt: -1 } ).then(tasks => res.send(tasks))
}

module.exports = TaskController;