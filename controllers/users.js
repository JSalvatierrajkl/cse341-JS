const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
        const users = await result.toArray();
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json(users[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: errors.array() 
            });
        }

        const user = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            ipaddress: req.body.ipaddress,
            birthday: req.body.birthday,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
        
        if (response.acknowledged) {
            res.status(201).json({ 
                message: 'User created successfully',
                id: response.insertedId 
            });
        } else {
            res.status(500).json({ error: 'Failed to create user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: errors.array() 
            });
        }

        const userId = new ObjectId(req.params.id);
        const user = {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            ipaddress: req.body.ipaddress,
            birthday: req.body.birthday,
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
        
        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};



module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}