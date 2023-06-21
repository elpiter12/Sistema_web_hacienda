const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
dotenv.config();
const PORT_DEV = process.env.PORT_DEV || 8080;
const DB_DEV_HOST = process.env.DB_DEV_HOST || 'localhost';
//creando una instancia de express
const app = express();
//Configurando el router

app.use(cors());
app.enable('trust proxy'); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./api'));
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(function(req, res, next) {
  const host = req.protocol + '://' + req.get('host');
  res.render('404',{host});
});

app.listen(PORT_DEV, () => console.log(`Sistema corriendo en http://${DB_DEV_HOST}:${PORT_DEV}`));