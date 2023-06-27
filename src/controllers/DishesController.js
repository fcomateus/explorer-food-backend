const knex = require('../database/knex');
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')

class DishesController {
    async create (request, response){
        const { name, category, price, ingredients, description } = request.body
        const isInfoInvalid = [name,category,price, ingredients, description].includes(null) || [name,category,price,description].includes('')

        if(isInfoInvalid) {
            throw new AppError('Informações inválidas', 401)
        }

        const dishFilename = request.file.filename
        const diskStorage = new DiskStorage();
        const filename = await diskStorage.saveFile(dishFilename)
        const image_path = filename
        
        const dish = await knex('dishes').insert({
            name,
            price: parseFloat(price).toFixed(2),
            ingredients,
            category_id: category,
            description,
            image_path
        }).returning('*')

        return response.status(201).json(dish)
    }

    async show(request, response) {
        const dishes = await knex('dishes')
        return response.json(dishes)
    }

    async index(request, response) {
        const { id } = request.params
        const dish = await knex('dishes').where({ id }).first()
        response.status(200).json(dish)
    }

    async delete(request, response) {
        const { id } = request.params

        let deletedDish
        try {
            deletedDish = await knex('dishes').where({ id }).del().returning('*')
        } catch(error) {
           throw new AppError('Não foi possível deletar o prato') 
        }

        return response.status(200).json(deletedDish)
    }
}

module.exports = DishesController