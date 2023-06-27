const express = require('express');
const verificarToken = require('../../lib/verificarToken')
const router = express.Router();


router.get('/', async (req,res) => {
	///destruyendo el token de la session
	res.clearCookie('sessionToken');
	return res.redirect('/login')
})


module.exports = router;	