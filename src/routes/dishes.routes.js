const { Router } = require('express');
const dishesRoutes = Router();

const multer = require('multer')
const uploadConfig = require('../configs/upload')
const upload = multer(uploadConfig.MULTER)

const DishesIMagesController = require('../controllers/DishesImagesController');
const dishesImagesController = new DishesIMagesController();

dishesRoutes.post('/dishes-images', upload.single('dish'), dishesImagesController.create)


module.exports = dishesRoutes