const knex = require('../database/knex');

class CategoriesController {
    async create (request, response){
       const { name, category, price, description } = request.body
    
    }
}

module.exports = CategoriesController