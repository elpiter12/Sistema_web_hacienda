/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('mensajes', table => {
    table.increments('id').primary();
    table.string('nombres_usuarios', 100);
    table.string('apellidos_usuarios', 100);
    table.string('correo_usuario', 255);
    table.string('telefono', 255);
    table.text('mensaje');
    table.datetime('creado').notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('mensajes');
  
};
