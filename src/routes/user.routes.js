const { Router } = require('express');
const usersRoutes = Router();

const UsersController = require('../controllers/UsersController');
const userController = new UsersController();

usersRoutes.post('/', userController.create)

module.exports = usersRoutes