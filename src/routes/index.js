const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/',(req,res) => {
	//iniciamo la vista principal
	res.render('home',{
		host: process.env.DB_DEV_HOST,
      	port: process.env.PORT,
	});
	console.log("GET / home");
})


module.exports = router;	