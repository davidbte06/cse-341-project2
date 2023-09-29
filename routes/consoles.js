const express = require('express');
const router = express.Router();

const consolesController = require('../controllers/consoles')

router.get('/', consolesController.getAll);
router.get('/:id', consolesController.getSingle);

module.exports = router;