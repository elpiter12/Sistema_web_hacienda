const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/',(req,res) => {
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