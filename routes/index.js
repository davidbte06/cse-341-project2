const router = require('express').Router();
// router.get('/', (req, res) => { res. send('Welcome');});
router.use('/', require('./swagger'));

router.use('/consoles', require('./consoles'));

module.exports = router;