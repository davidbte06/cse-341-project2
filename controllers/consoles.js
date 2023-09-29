const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('consoles').find();
    result.toArray().then((consoles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(consoles);
    });
};

const getSingle = async (req, res) => {
    const consolesId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('consoles').find({ _id: consolesId });
    result.toArray().then((consoles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(consoles[0]);
    });
};

const createConsoles = async (req, res) => {
    try {
        if (!req.body || !req.body.name || !req.body.manufacturer || !req.body.release_date) {
            res.status(400).json('Missing required data in the request body');
            return;
        }

        const console = {
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            release_date: req.body.release_date,
        };

        const response = await mongodb.getDatabase().db().collection('consoles').insertOne(console);

        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the console');
        }
    } catch (error) {
        // Handle the exception here
        console.error(error); // Log the error for debugging purposes
        res.status(500).json('An error occurred while processing the request');
    }
};


const updateConsoles = async (req, res) => {
    try {
        const consoleId = new ObjectId(req.params.id);
        const console = {
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            release_date: req.body.release_date,
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('consoles')
            .replaceOne({ _id: consoleId }, console);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the console');
        }
    } catch (error) {
        // Handle the exception here
        console.error(error); // Log the error for debugging purposes
        res.status(500).json('An error occurred while processing the request');
    }
};

const deleteConsoles = async (req, res) => {
    try {
        const consoleId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('consoles')
            .deleteOne({ _id: consoleId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the console');
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
    createConsoles,
    updateConsoles,
    deleteConsoles
};