// Import required libraries
const express = require('express'); // Express framework to create the server and routes
const { check, validationResult } = require('express-validator'); // Middleware for input validation
const bcrypt = require('bcryptjs'); // Library for hashing passwords (used in the User model)
const jwt = require('jsonwebtoken'); // For generating JSON web tokens for authenticated sessions
const User = require('../models/User'); // User model for interacting with the users collection in the database

const router = express.Router(); // Create a new router object

// Register a new user
router.post(
    '/register',
    [
        // Validate that username is not empty
        check('username', 'Username is required').not().isEmpty(),
        // Validate that email is in a proper format
        check('email', 'Please include a valid email').isEmail(),
        // Validate password is at least 6 characters long
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        // Check for validation errors from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // If errors exist, send a 400 response with error details
            return res.status(400).json({ errors: errors.array() });
        }

        // Destructure values from the request body
        const { username, email, password } = req.body;

        try {
            // Check if a user already exists with the same email
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            // Create a new instance of the User model
            user = new User({ username, email, password });
            // Save the new user to the database (password is expected to be hashed via User.pre-save middleware)
            await user.save();

            // Create payload for jwt token with user id
            const payload = { user: { id: user.id } };
            // Sign the JWT token with the payload and secret environment variable, expire in 1 hour
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                // Return the token in the response
                res.json({ token });
            });
        } catch (err) {
            // Log error on the server console and send a 500 error response
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Login user
router.post(
    '/login',
    [
        // Validate that email is provided and is in the correct format
        check('email', 'Please include a valid email').isEmail(),
        // Validate that a password exists in the request
        check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
        // Check for input validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return errors if there are any
            return res.status(400).json({ errors: errors.array() });
        }

        // Extract email and password from request body
        const { email, password } = req.body;

        try {
            // Find user by email
            let user = await User.findOne({ email });
            if (!user) {
                // If user is not found return error response
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                // If passwords don't match, return error response
                return res.status(400).json({ msg: 'Invalid credentials' });
            }

            // Create payload with user id for JWT signing
            const payload = { user: { id: user.id } };
            // Sign and generate the JWT token
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) throw err;
                // Return the token in the response
                res.json({ token });
            });
        } catch (err) {
            // Log error and respond with server error status
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Export the router to be used in other parts of the application
module.exports = router;