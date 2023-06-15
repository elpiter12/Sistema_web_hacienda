const router = require('express').Router();

router.use('/home', require('./src/routes'));
router.use('/login', require('./src/routes/login'));

module.exports = router;