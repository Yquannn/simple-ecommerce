const jwt = require('jsonwebtoken');

// Authentication middleware to verify the JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization: Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Replace with your secret key
    req.userId = decoded.userId; // Set userId in the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
