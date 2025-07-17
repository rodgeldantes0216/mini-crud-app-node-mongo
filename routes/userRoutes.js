const express = require('express');
const router = express.Router();
const md5 = require('md5');
const User = require('../models/User');

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: md5(password), // hash password
      created_at: new Date()
    });

    const saved = await newUser.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// READ ALL users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// READ ONE user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid user ID' });
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const updatedData = {
      first_name,
      last_name,
      email,
    };

    if (password) {
      updatedData.password = md5(password); // update password only if provided
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Update failed', error: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;
