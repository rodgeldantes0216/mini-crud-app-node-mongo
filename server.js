require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form data (optional)

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Auth routes (login/logout)
app.use(authRoutes);

// Authentication middleware
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  return res.redirect('/login');
}

// Protected route: index.html
app.get('/', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/', (req, res) => {
//   res.sendFile('index.html', { root: './public' });
// });

// Protected API routes
app.use('/api/users', isAuthenticated, userRoutes);

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// app.use('/api/users', userRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(console.error);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
