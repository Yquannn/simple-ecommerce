const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');

// const authenticate = require('../middlewares/authenticate.js');

// router.get('/cart',cartController.getCart);  


router.get('/cart-items/:email', cartController.getUserCartItems);
router.post('/cart-items', cartController.addToCart);

router.delete('/cart-items/:productId', cartController.removeFromCart);
module.exports = router;
