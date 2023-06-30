"use strict";
const { Modelo } = require("./Modelo");

class Mensajes extends Modelo {
  static get tableName() {
    //*Aquí va el nombre de la tabla que queremos conectarnos*//
    return "mensajes";
  }
}

module.exports = Mensajes;
