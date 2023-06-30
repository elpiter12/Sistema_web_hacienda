const router = require('express').Router();

router.use('/home', require('./src/routes'));
router.use('/', require('./src/routes'));
router.use('/login', require('./src/routes/login'));
router.use('/auth', require('./src/routes/auth'));
router.use('/cpanel', require('./src/routes/cpanel'));
router.use('/nuevaHistoria', require('./src/routes/nuevaHistoria'));
router.use('/noticias', require('./src/routes/noticias'));
router.use('/contact', require('./src/routes/contact'));
router.use('/mensaje-enviado', require('./src/routes/mensaje-enviado'));
router.use('/admins', require('./src/routes/admin'));
router.use('/salir', require('./src/routes/salir'));
router.use('/error', require('./src/routes/error'));

module.exports = router;