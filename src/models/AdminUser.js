"use strict";
const { Modelo } = require("./Modelo");

class AdminUser extends Modelo {
  static get tableName() {
    //*Aquí va el nombre de la tabla que queremos conectarnos*//
    return "user_admin";
  }
}

module.exports = AdminUser;
