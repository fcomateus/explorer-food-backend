const knex = require('../database/knex');

class CategoriesController {
    async show (request, response){
        const { term } = request.params

        console.log(term);

    }
}

module.exports = CategoriesController