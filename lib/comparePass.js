const bcrypt = require('bcryptjs');

module.exports = function compareBcryptPass(pass, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, hash, (err, result) => {
      if (err)
        reject(err);
      else
        resolve(result);
    });
  });
}
