// Import the Mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Import the 'config' package to manage configuration settings
const config = require('config');

// Retrieve the MongoDB URI (connection string) from the configuration settings
const db = config.get('mongoURI');

// Define an asynchronous function named connectDB to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the provided connection string and options.
    // 'useNewUrlParser' and 'useUnifiedTopology' are options to make the connection process smoother.
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    // If connection is successful, log a confirmation message to the console.
    console.log('MongoDB Connected...');
  } catch (err) {
    // If there is an error during connection, log the error message.
    console.error(err.message);
    
    // Exit the process with a failure code (1) in case of any connection errors.
    process.exit(1);
  }
};

// Export the connectDB function so it can be used in other parts of the application.
module.exports = connectDB;
