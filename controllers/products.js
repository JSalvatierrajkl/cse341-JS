const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const result = await mongodb.getDatabase().db().collection('products').find();
        const products = await result.toArray();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('products').find({ _id: productId });
        const products = await result.toArray();
        
        if (products.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(200).json(products[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};

const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: errors.array() 
            });
        }

        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            stock: req.body.stock,
            sku: req.body.sku,
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            color: req.body.color,
            material: req.body.material,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
        
        if (response.acknowledged) {
            res.status(201).json({ 
                message: 'Product created successfully',
                id: response.insertedId 
            });
        } else {
            res.status(500).json({ error: 'Failed to create product' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                error: 'Validation failed', 
                details: errors.array() 
            });
        }

        const productId = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            brand: req.body.brand,
            stock: req.body.stock,
            sku: req.body.sku,
            weight: req.body.weight,
            dimensions: req.body.dimensions,
            color: req.body.color,
            material: req.body.material,
            updatedAt: new Date()
        };

        const response = await mongodb.getDatabase().db().collection('products').replaceOne({ _id: productId }, product);
        
        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Product updated successfully' });
        } else {
            res.status(500).json({ error: 'Failed to update product' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('products').deleteOne({ _id: productId });
        
        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};
