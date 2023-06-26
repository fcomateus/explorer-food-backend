
exports.up = knex => knex.schema.createTable('favorite_dishes', table => {
    table.increments('id')
    table.integer('user_id')
    .references('id')
    .inTable('users')

    table.integer('dish_id')
    .references('id')
    .inTable('dishes')

})

exports.down = knex => knex.schema.dropTable('favorite_dishes')