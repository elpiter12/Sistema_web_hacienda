/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const hashPass = require('../lib/hasPass');


exports.seed = async function(knex) {
  // Deletes ALL existing entries
  console.log('Borrando datos');
  await knex('user_admin').del();

  await knex("user_admin").insert({
    id: 1,
    nombre: 'Admin',
    pass: await hashPass('12345'),
    correo: "admin@admin.com",
    creado: new Date()
  });
};
