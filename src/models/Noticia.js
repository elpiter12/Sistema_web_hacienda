"use strict";
const { Modelo } = require("./Modelo");

class Noticia extends Modelo {
  static get tableName() {
    //*Aquí va el nombre de la tabla que queremos conectarnos*//
    return "news";
  }
}

module.exports = Noticia;
