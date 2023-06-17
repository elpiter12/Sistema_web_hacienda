const express = require('express');
const sesion = require('../../middleware/session');
const verificarToken = require('../../lib/verificarToken')
const router = express.Router();


router.get('/', verificarToken , async (req,res) => {
	//buscamos los datos del
	console.log(req.user_admin);
	res.render('cPanel/main');
	console.log("GET / cPanel");
})


module.exports = router;	