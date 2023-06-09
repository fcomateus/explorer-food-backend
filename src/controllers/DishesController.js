const knex = require('../database/knex');
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage');

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


    async update(request, response) {
        const { id } = request.params
        const { name, category, price, ingredients, description } = request.body
        const isInfoInvalid = [name,category,price, ingredients, description].includes(null) || [name,category,price,description].includes('')

        if(isInfoInvalid) {
            throw new AppError('Informações inválidas', 401)
        }

        const dishOldInfos = await knex('dishes').where({ id }).returning('*').first();
        
        let newImagePath = ''
        if(request.files != null && request.files.length > 0) {
            const dishFilename = request.files[0].filename
            const diskStorage = new DiskStorage();
            await diskStorage.deleteFile(dishOldInfos.image_path)
            newImagePath = await diskStorage.saveFile(dishFilename)
        }

        const updatedDish = await knex('dishes').where({ id })
        .update({
            name,
            category_id: category,
            price,
            description,
            ingredients,
            image_path: newImagePath != '' ? newImagePath : dishOldInfos.image_path
        }).returning('*')

        return response.json(updatedDish)

    }

    async show(request, response) {
        const dishes = await knex('dishes')
        return response.json(dishes)
    }

    async index(request, response) {
        const { id } = request.params
        const dish = await knex('dishes').where({ id }).first()
        return response.status(200).json(dish)
    }

    async delete(request, response) {
        const { id } = request.params

        const diskStorage = new DiskStorage()

        const dish = await knex('dishes').where({ id }).first()

        try {
            if(dish) {
                await knex('dishes').where({ id }).del()
                await diskStorage.deleteFile(dish.image_path)
            } else {
                throw new AppError('Não encontrado')
            }
        } catch(error) {
           throw new AppError('Não foi possível deletar o prato') 
        }

        return response.status(200).json(dish)
    }
}

module.exports = DishesController