const express = require('express');
const router = express.Router();
const multer = require('multer');
const Noticia = require('../models/Noticia');
const verificarToken = require('../../lib/verificarToken')
const convertirFecha = require('../../lib/convertir_fecha')
const path = require('path');

require('dotenv').config();
// Crear una instancia de multer con la configuración deseada
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Ruta para la carga de imágenes y datos del formulario
router.post('/', verificarToken ,upload.single('imagen'), async (req, res) => {
  const {titulo,des} = req.body;
  // Manejar los datos y la imagen aquí
  const img = req.file; // Objeto que contiene la información de la imagen cargada

  const noticiaToSave = { titulo,des,img : req.file.filename}

  try{
    const saveNoticia = await Noticia.query().insert(noticiaToSave)

    console.log("NOTICA GUARDADA")
    return res.redirect('/nuevaHistoria?error=false&mensaje=Noticia Creada!');

  }catch(e){
    console.log(e)
    res.render(error);
  }
});
router.get('/' , verificarToken ,async (req, res) => {
  const admin = req.user_admin.admin; //tomamos los datos del usuario admin
  //consultamos todos las noticias
  try{
    const allNoticias = await Noticia.query();
  
    //formateando la fecha de creado de las noticias a una fecha mas entendible
    const noticiasFormateadas =  allNoticias.map((noticia) =>{
      noticia.creado = convertirFecha(noticia.creado);
      return noticia
    })
   
    res.render('cPanel/noticias',{
      nombre : admin.nombre,
      noticias: noticiasFormateadas
    });

  }catch(e){
    return res.send({error:e, mensaje:"ERROR INESPERADO!"})
  }
});
router.get('/new_noticia' , verificarToken ,async (req, res) => {
  const admin = req.user_admin.admin; //tomamos los datos del usuario admin
  //consultamos todos las noticias
    res.render('cPanel/new_noticia',{
      nombre : admin.nombre
    });
});


router.get('/preview' , verificarToken , async (req,res)=>{
  const {id,acction} = req.query;
  const admin = req.user_admin.admin; //tomamos los datos del usuario admin


  if(id != undefined && acction == 'ver'){

    //buscamos Solo una noticia para mostrarla
    try{
      const noticia = await Noticia.query().findById(id);
      noticia.creado = convertirFecha(noticia.creado);
      return res.render('cPanel/noticia-preview',{noticia,nombre:admin.nombre})
    }catch(e){
         return res.send({error:e, mensaje:"Noticia no encontrda"})
    }
  }
});
// This is bad practice, but i not have a app fortend for do request
router.get('/delete' ,  verificarToken , async (req,res) =>{
  const {id,acction} = req.query;
  if(id && acction == 'eliminar'){
    try{
      const deleted = await Noticia.query().deleteById(id);
      res.redirect('/nuevaHistoria?sucess=true');
    }catch(err){
      console.log(err)
    }

  }else{
    console.log("No existe id a eliminar")
    //llamamos a la vista de mostrar mensaje o erroes
  }
});


module.exports = router;	