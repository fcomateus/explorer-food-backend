const knex = require('../database/knex');
const DiskStorage = require('../providers/DiskStorage')

class CategoriesController {
    async create (request, response){
        const dishFilename = request.file.filename
        const diskStorage = new DiskStorage();

        const filename = await diskStorage.saveFile(dishFilename)
        
        return response.status(201).json()
    
    }
}

module.exports = CategoriesController