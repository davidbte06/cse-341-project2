const express = require('express');
const router = express.Router();

const consolesController = require('../controllers/consoles')

router.get('/', consolesController.getAll);
router.get('/:id', consolesController.getSingle);
router.post('/', consolesController.createConsoles);
router.put('/:id', consolesController.updateConsoles);
router.delete('/:id', consolesController.deleteConsoles);

module.exports = router;