const cartModel = require('../models/cartModel.js');
const accountModel = require('../models/accountModel.js');
const db = require('../config/dbConfig.js');


exports.removeFromCart = async (req, res) => {
  const { cartId, productId } = req.body;  // Get cartId and productId from the request body

  if (!cartId) {
    return res.status(400).json({ error: 'Cart ID is required' });
  }

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // Fetch cart by cartId
    let cart = await cartModel.getCartByCartId(cartId);

    if (!cart || cart.length === 0) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Remove the product from the cart
    const removeProductResult = await cartModel.removeProductFromCart(cartId, productId);

    if (removeProductResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    res.status(200).json({ message: 'Product removed from cart', result: removeProductResult });
  } catch (error) {
    console.error('Error removing product from cart:', error.message);
    res.status(500).json({ error: 'Failed to remove product from cart', details: error.message });
  }
};



exports.addToCart = async (req, res) => {
  const email = req.body.email || req.params.email;

  if (!email) {
    return res.status(400).json({ error: 'Email is missing or invalid' });
  }

  const { product_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  try {
    // Fetch user by email
    const user = await accountModel.fetchUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user.userId; // Extract userId from the fetched user object

    let cart = await cartModel.getCartByUserId(userId);

    if (!cart || cart.length === 0) {
      console.log('Cart not found, creating a new one...');
      cart = await cartModel.createCart(userId);

      console.log('New cart created:', cart);

      // Ensure `createCart` returns the cart ID properly
      if (!cart || !cart.cart_id) {
        throw new Error('Failed to create cart or retrieve cart ID');
      }
    }

    // Extract the cart ID
    const cartId = cart.cart_id || (Array.isArray(cart) && cart[0].cart_id);

    if (!cartId) {
      throw new Error('Cart ID is missing after fetching or creating cart');
    }

    // Add the product to the cart
    const addProductResult = await cartModel.addProductToCart(cartId, product_id);
    console.log('Product added to cart result:', addProductResult);

    res.status(201).json({ message: 'Product added to cart', cart: addProductResult });
  } catch (error) {
    console.error('Error adding product to cart:', error.message);
    res.status(500).json({ error: 'Failed to add product to cart', details: error.message });
  }
};



exports.getUserCartItems = async (req, res) => {
  const email = req.params.email;  // Get email from the URL parameter
  if (!email) {
    return res.status(400).json({ error: 'Email is missing or invalid' });
  }

  try {
    // Fetch cart by email
    const cart = await cartModel.getCartByEmail(email);  // Use the new getCartByEmail method
    console.log('Cart:', cart);

    if (cart.length === 0) {
      return res.status(404).json({ error: 'No cart found for this user' });
    }

    // Extract the cart ID
    const cartId = cart[0].cart_id;  // Assuming cart is an array of objects

    if (!cartId) {
      throw new Error('Cart ID is missing or invalid.');
    }

    // Fetch cart items
    console.log('Cart ID:', cartId);
    const cartItems = await cartModel.getCartItems(cartId);
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    res.status(500).json({ error: 'Failed to fetch cart items', details: error.message });
  }
};
