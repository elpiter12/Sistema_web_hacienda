const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


require('dotenv').config();

router.get('/', async (req,res) => {
	const token = req.cookies.sessionToken;
	

	//sancando el host dinamicamente
	if(req.secure){
		req.protocol = 'https';
	}
	const host = req.protocol + '://' + req.get('host');
	console.log(host)
	if(token != undefined){

		try{
		 const decodedToken = await jwt.verify(token, 'joan');
		 return res.redirect('/cpanel')
		}catch(e){
		  console.log("Token expirado")
		  console.log(e);
		  return res.render('login',{host:host, error: true, mensaje: "Sesión expirada"});
		}
	
	}
	
	//Login vista

	res.render('login',{
		host: host,
		error: false,
		mensaje: ''
	});

	console.log("GET / login");
})



module.exports = router;	