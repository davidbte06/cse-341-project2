const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['Games']
        // Retrieve all games from the database
        const result = await mongodb.getDatabase().db().collection('games').find();

        // Convert the result to an array
        const games = await result.toArray();

        // Respond with the data
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    } catch (error) {
        // Handle errors
        console.error(error);

        if (error instanceof CustomValidationError) {
            res.status(400).json({ error: error.message });
        } else if (error instanceof DatabaseError) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const getSingle = async (req, res) => {
    try {
        //#swagger.tags=['Games']
        const gameId = new ObjectId(req.params.id);

        // Add validation to check if req.params.id is a valid ObjectId
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }

        // Retrieve a single game by _id from the database
        const result = await mongodb.getDatabase().db().collection('games').find({ _id: gameId });

        // Convert the result to an array
        const games = await result.toArray();

        // Check if a game with the given _id exists
        if (games.length === 0) {
            res.status(404).json({ error: 'Game not found' });
            return;
        }

        // Respond with the data
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games[0]);
    } catch (error) {
        // Handle errors
        console.error(error);

        if (error instanceof CustomValidationError) {
            res.status(400).json({ error: error.message });
        } else if (error instanceof DatabaseError) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const createGames = async (req, res) => {
    //#swagger.tags=['Games']
    try {
        if (!req.body || !req.body.title || !req.body.genre || !req.body.platforms || !req.body.releaseYear || !req.body.developer || !req.body.rating || !req.body.price) {
            res.status(400).json('Missing required data in the request body');
            return;
        }

        const game = {
            title: req.body.title,
            genre: req.body.genre,
            platforms: req.body.platforms,
            releaseYear: req.body.releaseYear,
            developer: req.body.developer,
            rating: req.body.rating,
            price: req.body.price, // Corrected property name
        };

        const response = await mongodb.getDatabase().db().collection('games').insertOne(game);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the game');
        }
    } catch (error) {
        // Handle the exception here
        console.error(error); // Log the error for debugging purposes
        res.status(500).json('An error occurred while processing the request');
    }
};

const updateGames = async (req, res) => {
    //#swagger.tags=['Games']
    try {
        const gameId = new ObjectId(req.params.id);
        const game = {
            title: req.body.title,
            genre: req.body.genre,
            platforms: req.body.platforms,
            releaseYear: req.body.releaseYear,
            developer: req.body.developer,
            rating: req.body.rating,
            price: req.body.price, // Corrected property name
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('games')
            .replaceOne({ _id: gameId }, game);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the game');
        }
    } catch (error) {
        // Handle the exception here
        console.error(error); // Log the error for debugging purposes
        res.status(500).json('An error occurred while processing the request');
    }
};

const deleteGames = async (req, res) => {
    //#swagger.tags=['Games']
    try {
        const gameId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('games')
            .deleteOne({ _id: gameId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the game');
        }
    } catch (error) {
        // Handle the exception here
        console.error(error); // Log the error for debugging purposes
        res.status(500).json('An error occurred while processing the request');
    }
};

module.exports = {
    getAll,
    getSingle,
    createGames,
    updateGames,
    deleteGames
};
