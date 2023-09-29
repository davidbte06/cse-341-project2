const express = require('express');
const router = express.Router();

const gamesController = require('../controllers/games')

router.get('/', gamesController.getAll);
router.get('/:id', gamesController.getSingle);
router.post('/', gamesController.createGames);
router.put('/:id', gamesController.updateGames);
router.delete('/:id', gamesController.deleteGames);

module.exports = router;