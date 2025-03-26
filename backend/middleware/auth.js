const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from headers
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};