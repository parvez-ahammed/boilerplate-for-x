const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyTokenAndRole = (requiredRole) => (ctx, next) => {

    const token = ctx.headers.authorization && ctx.headers.authorization.split(' ')[1];

    
    if (!token) {
        ctx.status = 401;
        ctx.body = { message: 'Authorization header missing or invalid' };
        return;
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.role !== requiredRole) {
            ctx.status = 403;
            ctx.body = { message: 'Insufficient permissions' };
            return;
        }

        ctx.state.user = decoded;

        return next();
    } catch (error) {
        ctx.status = 401;
        ctx.body = { message: 'Invalid token' };
    }
};

module.exports = { verifyTokenAndRole };