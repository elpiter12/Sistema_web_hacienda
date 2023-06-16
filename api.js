const router = require('express').Router();

router.use('/home', require('./src/routes'));
router.use('/', require('./src/routes'));
router.use('/login', require('./src/routes/login'));
router.use('/auth', require('./src/routes/auth'));

module.exports = router;