const { Router } = require('express');
const dishesRoutes = Router();

const bodyParser = require('body-parser')

const multer = require('multer')
const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER);

const DishesController = require('../controllers/DishesController');
const dishesController = new DishesController();

dishesRoutes.use(bodyParser.urlencoded({ extended: true }))
dishesRoutes.post('/', upload.single('file'), dishesController.create)


module.exports = dishesRoutes