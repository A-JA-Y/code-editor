const jwt = require('jsonwebtoken'); // Import the JSON Web Token library
const httpErrors = require('http-errors'); // Import the library to create HTTP errors

// Middleware function to verify JWT and authorize user
const auth = async (req, res, next) => {
    try {
        // Extract the token from the Authorization header and remove the 'Bearer ' prefix
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // Verify the token using the secret key stored in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the decoded user information to the request object for later use
        req.user = decoded.user;
        
        // Call next() to pass control to the next middleware in the stack
        next();
    } catch (err) {
        // If token verification fails or an error occurs, pass a 401 error to the error handler
        next(httpErrors(401, 'Not authorized'));
    }
};

module.exports = auth; // Export the auth middleware for use in other parts of the application