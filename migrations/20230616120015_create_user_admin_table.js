/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
  return knex.schema.createTable('user_admin', table => {
    table.increments('id').primary();
    table.string('nombre', 255);
    table.string('correo', 50);
    table.string('pass', 255);
    table.datetime('creado').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_admin');
};
