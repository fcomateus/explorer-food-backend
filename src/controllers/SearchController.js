const knex = require('../database/knex');

class CategoriesController {
    async show (request, response){
        const { term } = request.query
        const dishes = await knex('dishes').whereRaw('lower(name) like ?', `%${term.toLowerCase()}%`)
        return response.json(dishes)
    }
}

module.exports = CategoriesController