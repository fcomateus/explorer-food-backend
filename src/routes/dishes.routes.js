const { Router } = require('express');
const dishesRoutes = Router();

const bodyParser = require('body-parser')

const multer = require('multer')
const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER);

const DishesController = require('../controllers/DishesController');
const dishesController = new DishesController();

const imageFileMiddleware = require('../middlewares/IsImageFile') 

dishesRoutes.use(bodyParser.urlencoded({ extended: true }))
dishesRoutes.get('/', dishesController.show)
dishesRoutes.post('/', upload.single('file'), dishesController.create)
dishesRoutes.delete('/:id', dishesController.delete)
dishesRoutes.put('/:id',imageFileMiddleware, dishesController.update)
dishesRoutes.get('/:id', dishesController.index)


module.exports = dishesRoutes