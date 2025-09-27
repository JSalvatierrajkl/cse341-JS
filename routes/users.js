const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const usersController = require('../controllers/users');

// Validation middleware
const validateUser = [
    body('username').notEmpty().withMessage('Username is required').isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('name').notEmpty().withMessage('Name is required').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('ipaddress').isIP().withMessage('Valid IP address is required'),
    body('birthday').isISO8601().withMessage('Valid birthday date is required')
];

const validateObjectId = [
    param('id').isMongoId().withMessage('Invalid user ID format')
];

const {isAuthenticated} = require('../middleware/authenticate');

// Routes
router.get('/', usersController.getAll);
router.get('/:id', validateObjectId, usersController.getSingle);
router.post('/', isAuthenticated, validateUser, usersController.createUser);
router.put('/:id', isAuthenticated, validateObjectId, validateUser, usersController.updateUser);
router.delete('/:id', isAuthenticated, validateObjectId, usersController.deleteUser);

module.exports = router;
