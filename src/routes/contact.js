const express = require('express');
const router = express.Router();
const Mensajes = require('../models/Mensajes.js')
require('dotenv').config();

router.get('/' , async (req,res) =>{
	const {error,mensaje} = req.query;
	return res.send({error,mensaje})
});

router.get('/bandeja_entrada', async (req,res ) => {
	//Devolvemos todos los mensajes
	const mensajes = Mensajes.query();
	return res.render('cPanel/mensajes',mensajes);
})


router.post('/' , async (req,res) => {
	let {nombres,apellidos,email,tlf,mensaje} = req.body;
	if(tlf == undefined){
		tlf = "sin numero de teléfono"
	}

	try{
		const saveMensaje = await Mensajes.query().insert({
			nombres_usuarios: nombres,
			apellidos_usuarios: apellidos,
			correo_usuario: email,
			telefono: tlf,
			mensaje
		})
		//error es un modal realmente
		return res.render('error',{error: false,mensaje:'todo bien'})
	}catch(e){
		console.log(e)
		return res.render('error',{
			error: true,
			mensaje: "No pudimos mandar tu mensaje, lo sentimos :("
		})
	}
})


module.exports = router;	