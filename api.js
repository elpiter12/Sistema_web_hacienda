const router = require('express').Router();

router.use('/home', require('./src/routes'));
router.use('/', require('./src/routes'));
router.use('/login', require('./src/routes/login'));
router.use('/auth', require('./src/routes/auth'));
router.use('/cpanel', require('./src/routes/cpanel'));
router.use('/error', require('./src/routes/error'));

module.exports = router;