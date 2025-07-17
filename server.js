const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is working');
});

mongoose.connect('mongodb://127.0.0.1:27017/sampledb')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, 'public')));