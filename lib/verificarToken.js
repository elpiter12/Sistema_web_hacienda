const cookieParser = require('cookie-parser');
const AdminUser = require('../src/models/AdminUser');
const jwt = require('jsonwebtoken');


module.exports = async function(req, res, next) {
    const sessionToken = req.cookies.token || req.headers.authorization;

  if (!sessionToken) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }
 let decodedToken;

    // Si el token está en la cookie
    if (req.cookies.token) {
      decodedToken = jwt.verify(sessionToken, 'joan');
    }
    // Si el token está en la cabecera Authorization
    else {
      const token = sessionToken.split(' ')[1];
      decodedToken = jwt.verify(token, 'joan');
    }
  // Si el token se encuentra en la cookie, verifica y decodifica el token
    try {
     console.log("ESTO ES LO QUE HAY n EL LAS COKIES")
     console.log(decodedToken);
     const isValid = await AdminUser.query().findById(decodedToken.id_admin);
     if(!isValid){
      console.log("token no valido porque no exite un usuario con ese id")
      return res.status(401).json({ mensaje: 'Token no proporcionado' });
     } 
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ mensaje: 'Token inválido' });
    }
};
