const express = require('express');
const router = express.Router();
const multer = require('multer');
require('dotenv').config();
// Crear una instancia de multer con la configuración deseada
const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán las imágenes


// Ruta para la carga de imágenes y datos del formulario
router.post('/', upload.single('imagen'), (req, res) => {
  // Manejar los datos y la imagen aquí
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion;
  const imagen = req.file; // Objeto que contiene la información de la imagen cargada

  // Realizar las acciones necesarias con los datos recibidos
  console.log("RUTA DE RECEPCION DE HISTORIA FINALIZADA")
  res.send('Datos y imagen recibidos correctamente');
});
module.exports = router;	