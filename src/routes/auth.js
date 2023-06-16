const express = require('express');
const AdminUser = require('../models/AdminUser');
const router = express.Router();


router.post('/', async (req,res) => {
	//geting the data user admin 
	const {user,pass} = req.body;

	if(!user){
		res.status(400).send({
			mensaje: "No Puedes enviar un usuario vacio!",
			err: "empy user"
		})
	}
	if(!pass){
		res.status(400).send({
				mensaje: "No puedes enviar una contraseña vacia!",
				err: "empy pass"
			})
	}

	//buscar el usuario en la DB
	const userFindend = await AdminUser.query().findOne('user',user);
	if(!userFindend){
		res.status(404).send({
			mensaje: "Nombre de usuario No encontrad",
			err: "user not found"
		})
	}


	//Autenticar admins
	res.status(200).send(userFindend);
	console.log("GET / Auth");
})



module.exports = router;