const express = require('express');
const router = express.Router();
const Mensajes = require('../models/Mensajes.js')
require('dotenv').config();

router.get('/' , async (req,res) =>{
    
    const {error,mensaje} = req.query;
    console.log(error,mensaje)
    return res.render('mensaje-enviado.',{
    error,mensaje
 })
});



module.exports = router;	