const knex = require('../database/knex');
const AppError = require('../utils/AppError')

class DishesController {
    async create (request, response, next){
        const { name, category, price, description } = request.body
        
        const isInfoValid = [name,category,price,description].includes(null) || [name,category,price,description].includes('')

        if(!isInfoValid) {
            throw new AppError('Informações inválidas', 401)
        }

        console.log('info', name, category, price, description);

        const dish = await knex('dishes').insert({
            name,
            price,
            category_id: category,
            description
        }).returning('*')

        request.dish = dish

        return next()


    }
}

module.exports = DishesController