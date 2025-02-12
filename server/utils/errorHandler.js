// Import the http-errors module to create HTTP error objects more easily
const httpErrors = require('http-errors');

// Define the error handler middleware for Express
// This function takes an error and sends an appropriate response to the client
const errorHandler = (err, req, res, next) => {
    // Set the HTTP status code to the error's status if available, otherwise default to 500 (Internal Server Error)
    res.status(err.status || 500).json({
        // Return the error message so the client knows what went wrong
        message: err.message,
        // If the environment is set to 'development', include the stack trace for debugging purposes;
        // otherwise, do not expose the stack trace in production environments
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
};

// Export the errorHandler function to be used in other parts of the application
module.exports = errorHandler;