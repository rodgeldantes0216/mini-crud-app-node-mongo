const express = require('express');
const md5 = require('md5');
const router = express.Router();
const User = require('../models/User');

// GET login page
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: './public' });
});

// POST login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: md5(password),
    deleted_status: false
  });

  if (user) {
    req.session.user = {
      id: user._id,
      name: `${user.first_name} ${user.last_name}`,
    };
    return res.redirect('/');
  }

  res.send('<h3>Invalid credentials</h3><a href="/login">Try again</a>');
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
