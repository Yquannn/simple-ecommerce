const productModel = require('../models/productModel.js');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.fetchAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price || !req.file) {
    return res.status(400).json({ error: 'All fields are required, including an image' });
  }

  try {
    const newProduct = await productModel.create(name, description, price, req.file.filename);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Other controller methods...
