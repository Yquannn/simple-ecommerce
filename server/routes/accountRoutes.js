const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to create a new account
router.post('/accounts', accountController.addAccount);

// Route to get all users (for testing or admin purposes)
router.get('/accounts', accountController.getUsers);

// Route to get a user by MemberId (correct route parameter syntax)
router.get('/accounts/:id', accountController.getUserById); // Use '/:id' to correctly capture the id parameter

// Route to log in a user
router.post('/accounts/login', accountController.login);

module.exports = router;
