const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
dotenv.config();
const PORT = process.env.PORT || 8080;
const DB_DEV_HOST = process.env.DB_DEV_HOST || 'localhost';
//creando una instancia de express
const app = express();
//Configurando el router

app.use(cors());
app.enable('trust proxy'); 
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use('/', require('./api'));
app.use(function(req, res, next) {
  const host = req.protocol + '://' + req.get('host');
  res.render('404',{host});
});
console.log(process.env.PORT);
console.log(process.env.DB_DEV_HOST);
console.log(process.env.DB_DEV_PORT);
console.log(process.env.DB_DEV_USER);
console.log(process.env.DB_DEV_PASS);
console.log(process.env.DB_DEV_NAME);

app.listen(PORT, () => console.log(`servicios levantados!`));