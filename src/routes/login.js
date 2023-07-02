const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
require('dotenv').config();

router.get('/', (req,res) => {
	//Si esta logueado, lo redirigimos al cpanel
	let token = req.cookies.sessionToken;
	if(typeof(token) === 'string'){
		res.redirect('/cPanel')
	}

	//sancando el host dinamicamente
	if(req.secure){
		req.protocol = 'https';
	}
	const host = req.protocol + '://' + req.get('host');
	console.log(host)
	//Login vista
	res.render('login',{
		host: host
	});

	console.log("GET / login");
})



module.exports = router;	