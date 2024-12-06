const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const uploadMiddleware = require('../middlewares/uploadMiddleware.js');

router.get('/products', productController.getAllProducts);
router.post('/products', uploadMiddleware.single('image'), productController.addProduct);
// router.post('/external', productController.addExternalProduct);

module.exports = router;
