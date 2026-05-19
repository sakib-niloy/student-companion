const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`); // Debugging
    const authHeader = req.headers.authorization;
    console.log('Incoming Authorization Header:', authHeader); // Debugging
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    
    // Supports "Token <token>" or "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err.message); // Debugging
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticate;
