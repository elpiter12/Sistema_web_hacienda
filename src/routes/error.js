const express = require('express');
const router = express.Router();


router.get('/', async (req,res) => {

	res.render('error',{error: true, mensaje: "Defaul error"});
	console.log("GET /Error");
})


module.exports = router;	