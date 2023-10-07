const express = require('express');
const router = express.Router();

const consolesController = require('../controllers/consoles')

const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', consolesController.getAll);
router.get('/:id', consolesController.getSingle);
router.post('/', isAuthenticated, consolesController.createConsoles);
router.put('/:id', isAuthenticated, consolesController.updateConsoles);
router.delete('/:id', isAuthenticated, consolesController.deleteConsoles);

module.exports = router;