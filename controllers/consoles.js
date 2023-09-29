const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        //#swagger.tags=['Consoles']
        // Retrieve all consoles from the database
        const result = await mongodb.getDatabase().db().collection('consoles').find();

        // Convert the result to an array
        const consoles = await result.toArray();

        // Respond with the data
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(consoles);
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
        //#swagger.tags=['Consoles']
        const consolesId = new ObjectId(req.params.id);

        // Add validation to check if req.params.id is a valid ObjectId
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ObjectId' });
            return;
        }

        // Retrieve a single console by _id from the database
        const result = await mongodb.getDatabase().db().collection('consoles').find({ _id: consolesId });

        // Convert the result to an array
        const consoles = await result.toArray();

        // Check if a console with the given _id exists
        if (consoles.length === 0) {
            res.status(404).json({ error: 'Console not found' });
            return;
        }

        // Respond with the data
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(consoles[0]);
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


const createConsoles = async (req, res) => {
    //#swagger.tags=['Consoles']
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
    //#swagger.tags=['Consoles']
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
    //#swagger.tags=['Consoles']
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