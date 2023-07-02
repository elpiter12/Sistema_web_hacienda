const express = require('express');
const router = express.Router();
const { Model, raw } = require('objection');
const Mensajes = require('../models/Mensajes.js');
const Modelo = require('../models/Modelo.js');

const verificarToken = require('../../lib/verificarToken')
const convertirFecha = require('../../lib/convertir_fecha')
require('dotenv').config();

router.get('/' , async (req,res) =>{
	const {error,mensaje} = req.query;
	return res.send({error,mensaje})
});

router.get('/bandeja_entrada',verificarToken, async (req,res ) => {
	const nombre = req.user_admin.admin.nombre; //tomamos los datos del usuario admin
	//Devolvemos todos los mensajes
	const mensajes = await Mensajes.query().select('*').select(raw("LEFT(mensaje, 15) AS mensaje_resumido"));

	return res.render('cPanel/mensajes',{mensajes,nombre});
})

router.get('/bandeja_entrada/delete',verificarToken, async (req,res ) => {
	const {id} = req.query;
	try{
		const deleted = await Mensajes.query().deleteById(id);
		return res.render('cPanel/borrar-mensaje',{
			redirectUrl:"/cPanel",
			mensaje: "Borrado exitosamente"
		})
	}catch(e){
		return res.send(e)
	}
})

router.get('/bandeja_entrada/ver',verificarToken, async (req,res ) => {
	const nombre = req.user_admin.admin.nombre; //tomamos los datos del usuario admin

	const {id} = req.query;
	try{

		const mensaje = await Mensajes.query().findById(id);
		mensaje.creado = convertirFecha(mensaje.creado)
		return res.render('cPanel/ver-mensaje',{
			redirectUrl:"/cPanel",nombre,mensaje})
	}catch(e){
		return res.send(e)
	}
})


router.post('/' , async (req,res) => {
	let {nombres,apellidos,email,tlf,mensaje} = req.body;
	if(tlf == undefined || tlf == ''){
		tlf = "sin numero de teléfono"
	}
		console.log("RENDIRZANDO LA VISTGA DEMENSAJE ENVIADO")

	try{
		const saveMensaje = await Mensajes.query().insert({
			nombres_usuarios: nombres,
			apellidos_usuarios: apellidos,
			correo_usuario: email,
			telefono: tlf,
			mensaje
		})
		return res.render('mensaje-enviado',{redirectUrl:"/" ,mensaje:"TU MENSAJE FUE ENVIADO CORRECTAMENTE"})
	}catch(e){
		console.log(e)
		return res.render('error',{
			error: true,
			mensaje: "No pudimos mandar tu mensaje, lo sentimos :("
		})
	}
})


module.exports = router;	