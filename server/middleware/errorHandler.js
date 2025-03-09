const httpErrors = require('http-errors');

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Check if the error is a known HTTP error
  if (err instanceof httpErrors.HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  }

  // Handle unexpected errors
  res.status(500).json({
    message: 'Something went wrong on the server.',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

module.exports = errorHandler;