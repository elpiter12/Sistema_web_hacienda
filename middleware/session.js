const AdminUser = require('../src/models/AdminUser');


function sesion(permitido=null) {
  return async function(req, res, next) {
    const token = req.headers['token'];
    const id_admin = req.headers['id_admin'];

    if (!token || !id_admin) {
      return res.status(401).send({mensaje:"Se requere autenticacion"});
    }

    if (permitido) {
      if (permitido === 'admin' && !id_admin) {
        return res.status(401).send({message:"Se requere autenticacion" , message_reference : "server.invalid_fields"});
      }
    }

    let sesion;

    if (id_admin) {
      sesion = await AdminUser.query().findById(id_admin).catch(err => null);
    }

    if (!sesion) {
      return res.status(401).send({message:"Se requere autenticacion" , message_reference : "server.invalid_fields"});
    }

    if (sesion.token !== token) {
      return res.status(401).send({message:"Token invalido" , message_reference : "server.invalid_fields"});
    }

    req.sesion = sesion;
    console.log(sesion);
    next();
  }
}

module.exports = sesion;
