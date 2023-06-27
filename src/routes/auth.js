const express = require('express');
const AdminUser = require('../models/AdminUser');
const router = express.Router();
const comparePass = require('../../lib/comparePass')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


router.post('/', async (req,res) => {
	//geting the data user admin 
	const {correo,pass} = req.body;

	if(!correo){
		return res.status(400).send({
			mensaje: "No Puedes enviar un correo vacio!",
			err: "empy correo"
		})
	}
	if(!pass){
		return res.status(400).send({
				mensaje: "No puedes enviar una contraseña vacia!",
				err: "empy pass"
			})
	}

	//buscar el usuario en la DB
	const userFindend = await AdminUser.query().findOne({ correo: correo })
	if(!userFindend){
		console.log("El correo deproporcioando no exite en la db /auth post")
		return	res.status(404).send({
			mensaje: "usuario no encontrado",
			err: true
		})
	}

	const acceso = await comparePass(pass,userFindend.pass);
	console.log(acceso);

	if(acceso){
		// Generar el token de sesión
		const admin = {
			id: userFindend.id,
			nombre: userFindend.nombre,
			correo: userFindend.correo
		}
		const token = jwt.sign({ admin }, 'joan', { expiresIn: '1h' });
		// Almacenar el token en una cookie
		res.cookie('sessionToken', token, { httpOnly: true });
		return res.json({token})
	}
	console.log("Aceso denegado");
	console.log("POST / Auth");
	return	res.status(404).send({
			mensaje: "Clave invalida",
			err: true
	})

})



module.exports = router;