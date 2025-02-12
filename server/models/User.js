// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');
// Import bcrypt for hashing passwords
const bcrypt = require('bcrypt');

// Create a new Mongoose Schema for users
// This schema outlines the structure of the user documents in the database
const UserSchema = new mongoose.Schema({
  // The user's name (required)
  name: {
    type: String,
    required: true,
  },
  // The user's email (required and must be unique)
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // The user's password (required)
  password: {
    type: String,
    required: true,
  },
  // The date the user was created; defaults to the current date/time
  date: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash the password before saving the user document
// This function runs before every 'save' command on a user document
UserSchema.pre('save', async function (next) {
  // Check if the password field was modified (or if it is a new document)
  if (this.isModified('password')) {
    // Hash the password with a salt factor of 10
    this.password = await bcrypt.hash(this.password, 10);
  }
  // Proceed to the next middleware or complete the save operation
  next();
});

// Add a custom method to the UserSchema for comparing passwords
// This method takes a candidate password (plain text)
// It hashes it and compares it to the stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the model so it can be used in other parts of the application
module.exports = mongoose.model('user', UserSchema);
