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

module.exports = {
    getAll,
    getSingle
};