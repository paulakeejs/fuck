// simpleAuth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Basic auth check (no roles)
const checkAuth = (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).send('No token provided');
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Add user ID to request
    req.user = decoded; 
    
    next();
  } catch (err) {
    console.log('Auth error:', err.message);
    return res.status(401).send('Invalid token');
  }
};

module.exports = checkAuth;

