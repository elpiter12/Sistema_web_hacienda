const express = require('express');
const AdminUser = require('../models/AdminUser');
const router = express.Router();
const verificarToken = require('../../lib/verificarToken')


router.get('/',verificarToken, async (req,res) => {
	const nombre = req.user_admin.admin.nombre; //tomamos los datos del usuario admin
	const {id,acction} = req.query;
	if(id != undefined && acction != undefined){
		//Empezamos a realizar el crud Aqui mismo
		if(acction == 'eliminar'){
			//emprendemos la accion de elminar
			try{
				const deleted  = await AdminUser.query().deleteById(id);
				const allAdmins = await AdminUser.query();
				return res.render('cPanel/modal',{title:"Eliminado", text: "El usuario has ido eliminado",icon: "success",redirectUrl:'/admins'})
			}catch(e){
				console.log(e)
				return res.render('cPanel/admins?sucess=true&mensajes=No su puedo eliminar la cuenta de usaurio',{nombre,e,mensaje:"No se pudo eliminar esta cuenta de Usuario"})
			}

		}
	}


	//geting the data user admin 
	const allAdmins = await AdminUser.query().select('id','nombre','correo','creado');

	return res.render('cPanel/admins',{allAdmins , nombre});



})

router.get('/new',verificarToken, async (req,res) => {
	const nombre = req.user_admin.admin.nombre; //tomamos los datos del usuario admin
	res.render('cPanel/new_admin',{nombre});
});

router.post('/new',verificarToken, async (req,res) => {
	const {nombre,correo,pass,confirm_pass} = req.body;

	if(pass != confirm_pass){
		return res.render('cPanel/modal',{title:"las contraseñas no coinciden",text:"Revisa las contraseñas no son iguales",icon:"error",redirectUrl:"/admins"})
	}
	try{
		const insertAdmin = await AdminUser.query().insert({nombre,correo,pass})
	
		return res.render('cPanel/modal',{title:"Usuario Registrado con exito",text:"YA puede empezar a realizar tareas administrativas",icon:"success",redirectUrl:"/admins"});
	}catch(e){
		console.log(e);
		return res.render('cPanel/modal',{title:"Algo malo paso",text:"Error al momento de guardar el admin",icon:"error",redirectUrl:"/admins"});

	}
})
module.exports = router;