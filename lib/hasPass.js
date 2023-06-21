const bcrypt = require('bcryptjs');

module.exports = function hashBcryptPass(pass, rounds=8) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pass, rounds, (err, hash) => {
      if (err)
        reject(err);
      else
        resolve(hash);
    });
  });
}
