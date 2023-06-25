
exports.up = knex => knex.schema.createTable('categories', table => {
    table.increments('id')
    table.string('description').notNullable()
})

exports.down = knex => knex.schema.dropTable('categories')