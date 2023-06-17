const express = require('express');
const AdminUser = require('../models/AdminUser');
const router = express.Router();
const comparePass = require('../../lib/comparePass')
const genToken = require('../../lib/genToken');
const jwt = require('jsonwebtoken');


router.post('/', async (req,res) => {
	//geting the data user admin 
	const {correo,pass} = req.body;
	console.log(req.body);
	if(!correo){
		return res.status(400).send({
			mensaje: "No Puedes enviar un correo vacio!",
			err: true
		})
	}
	if(!pass){
		return res.status(400).send({
				mensaje: "No puedes enviar una contraseña vacia!",
				err: true
			})
	}

	//buscar el usuario en la DB
	const userFindend = await AdminUser.query().findOne({ correo: correo })
	if(!userFindend){
		console.log("El correo deproporcioando no exite en la db /auth post")
		return res.status(404).send({
			mensaje: "usuario no encontrado",
			err: true
		})
	}

	const acceso = await comparePass(pass,userFindend.pass);

	if(acceso){
		// Generar el token de sesión
		const token = jwt.sign({ id_admin: userFindend.id }, 'joan', { expiresIn: '1h' });

		  // Establecer la cookie con el token
		  res.cookie('token', token, { httpOnly: true });

		  // Enviar una respuesta al cliente
		 return res.json({token});
	}
	console.log("Aceso denegado");
	console.log("POST / Auth");
	return res.status(401).json({ mensaje: 'contraseña incorrecta',err:true });

})



module.exports = router;