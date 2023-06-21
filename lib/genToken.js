/**
 * Generar caracteres aleatorios de la longitud especificada
 */

const crypto = require('crypto');

module.exports = function genToken(length) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length/2), (err, buffer) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(buffer.toString('hex').slice(0, length));
      }
    });
  });
}
