const express = require('express');
const sesion = require('../../middleware/session');
const verificarToken = require('../../lib/verificarToken')
const router = express.Router();


router.get('/', verificarToken , async (req,res) => {
	const admin = req.user_admin.admin; //tomamos los datos del usuario admin

	res.render('cPanel/main',{nombre: admin.nombre});
	console.log("GET / cPanel");
})


module.exports = router;	