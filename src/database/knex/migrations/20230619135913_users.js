
exports.up = knex => knex.schema.createTable("users", table => {
    table.increments("id")
    table.string("email")
    table.string("password")
    table.string("role")
})

exports.down = knex => knex.schema.dropTable("users")
