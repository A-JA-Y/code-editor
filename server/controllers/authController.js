const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
    // Destructure username, email, and password from the request body
    const { username, email, password } = req.body;

    try {
        // Check if a user with the given email already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user instance with the provided data
        user = new User({ username, email, password });
        // Save the new user to the database
        await user.save();

        // Create a payload object with the user's id
        const payload = { user: { id: user.id } };
        // Sign a JWT token with the payload and secret key, set to expire in 1 hour
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            // Return the token as JSON response
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Log in an existing user
const loginUser = async (req, res) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Use the user's comparePassword method to validate the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Prepare the payload with the user id for JWT signing
        const payload = { user: { id: user.id } };
        // Sign a JWT with the user payload and secret, set the token to expire in 1 hour
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            // Return the token as a JSON response
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { registerUser, loginUser };