const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games')

const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', gamesController.getAll);
router.get('/:id', gamesController.getSingle);
router.post('/', isAuthenticated, gamesController.createGames);
router.put('/:id', isAuthenticated, gamesController.updateGames);
router.delete('/:id', isAuthenticated, gamesController.deleteGames);

module.exports = router;