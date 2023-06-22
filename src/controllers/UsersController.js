const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const knex = require('../database/knex');

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const [checkUserExist] = await knex('users').where({ email })
        
        if(checkUserExist) {
            throw new AppError("Este e-email já está em uso")
        }

        const hashedPassword = await hash(password, 8)

        const userCreated = {
            name,
            email,
            password: hashedPassword
        }

        await knex('users').insert(userCreated)

        return response.status(201).json(userCreated)

    }
}

module.exports = UsersController