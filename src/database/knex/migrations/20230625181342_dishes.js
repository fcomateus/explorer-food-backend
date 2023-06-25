
exports.up = knex => knex.schema.createTable('dishes', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.specificType('price', 'float').notNullable()
    table.string('image_path').notNullable()
    table.string('description').notNullable()
    table.integer('category_id')
    .references('id').inTable('categories').notNullable()
})


exports.down = knex => knex.schema.dropTable('dishes')
