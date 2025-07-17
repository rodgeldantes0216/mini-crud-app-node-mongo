const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    const saved = await user.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: 'User not found' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
