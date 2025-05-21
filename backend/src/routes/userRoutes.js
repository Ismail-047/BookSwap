const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Register user
router.post('/register', [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[0-9]/).withMessage('Password must contain at least one number')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character'),
], async (req, res) => {
  const { firstName, lastName, email, password, mobile, address } = req.body;

  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user without isApproved field
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile,
      address,
      role: 'user',  // No approval process needed
    });

    // Save user to DB
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);  // Log the error to help with debugging
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});


// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User Found:', user);  // Debugging log

    // Compare entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;
