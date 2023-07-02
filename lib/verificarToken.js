const cookieParser = require('cookie-parser');
const AdminUser = require('../src/models/AdminUser');
const jwt = require('jsonwebtoken');


module.exports = async function(req, res, next) {
  const sessionToken = req.cookies.sessionToken || req.headers.authorization;

  if (!sessionToken) {
    return res.status(401).json({
      mensaje: 'Token no proporcionado'
    });
  }
  let decodedToken;
  // Si el token está en la cookie
  if (req.cookies.sessionToken) {

    try{
      decodedToken = await jwt.verify(req.cookies.sessionToken, 'joan');
    }catch(e){
      console.log("Token expirado")
      console.log(e);
      return res.render('login',{error: true, mensaje: "Sesión expirada"});
    }


  } else {
   
    // Si el token está en la cabecera Authorization
    const token = sessionToken.split(' ')[1];
    console.log(sessionToken);
    try{
      decodedToken = await jwt.verify(token, 'joan');
    }catch(e){
      console.log("Token expirado")
      console.log(e)
      return res.render('modal_error',{error: true, mensaje: "Sesión expirada"});
    } 
    return 1;
  }
  // Si el token se encuentra en la cookie, verifica y decodifica el token
  console.log("Eso es el token decodificado")
  console.log(decodedToken);
  req.user_admin = decodedToken;
  next();
};