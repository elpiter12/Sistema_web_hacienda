const express = require('express');
const router = express.Router();
const multer = require('multer');
const Noticia = require('../models/Noticia');
const convertirFecha = require('../../lib/convertir_fecha')

const path = require('path');

router.get('/' , async (req, res) => {
  const noticiaId = req.query.id;


  try{
    if(noticiaId == undefined){
      const allNoticias = await Noticia.query();
      //formateando la fecha de creado de las noticias a una fecha mas entendible
      const noticiasFormateadas =  allNoticias.map((noticia) =>{
        noticia.creado = convertirFecha(noticia.creado);
        noticia.des  = noticia.des.substring(0, 60);
        return noticia
      })
      return res.render('noticias',{
         noticias: noticiasFormateadas
       });
    }else{
      const noticia = await Noticia.query().findById(noticiaId);;
      //formateando la fecha de creado de las noticias a una fecha mas entendible
      noticia.creado = convertirFecha(noticia.creado);
      noticia.des  = noticia.des.substring(0, 60);
      return res.render('noticia',{
         noticia
       });
    }
  



  }catch(e){
  	console.log(e);
    return res.send({error:e, mensaje:"Error al mostrar todas las noticias a los clientes"})
  }
});

module.exports = router;	