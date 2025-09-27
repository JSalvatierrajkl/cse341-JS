const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const productsController = require('../controllers/products');

// Validation middleware
const validateProduct = [
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('description').notEmpty().withMessage('Description is required').isLength({ min: 4, max: 500 }).withMessage('Description must be between 4 and 500 characters'),
    body('price').isNumeric().withMessage('Price must be a number').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').notEmpty().withMessage('Category is required').isLength({ min: 1, max: 50 }).withMessage('Category must be between 1 and 50 characters'),
    body('brand').notEmpty().withMessage('Brand is required').isLength({ min: 1, max: 50 }).withMessage('Brand must be between 1 and 50 characters'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('sku').notEmpty().withMessage('SKU is required').isLength({ min: 1, max: 20 }).withMessage('SKU must be between 1 and 20 characters'),
    body('weight').isNumeric().withMessage('Weight must be a number').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
    body('color').notEmpty().withMessage('Color is required').isLength({ min: 1, max: 30 }).withMessage('Color must be between 1 and 30 characters')
];

const validateObjectId = [
    param('id').isMongoId().withMessage('Invalid product ID format')
];

const {isAuthenticated} = require('../middleware/authenticate');

// Routes
router.get('/', productsController.getAll);
router.get('/:id', validateObjectId, productsController.getSingle);
router.post('/', isAuthenticated, validateProduct, productsController.createProduct);
router.put('/:id', isAuthenticated, validateObjectId, validateProduct, productsController.updateProduct);
router.delete('/:id', isAuthenticated, validateObjectId, productsController.deleteProduct);

module.exports = router;
