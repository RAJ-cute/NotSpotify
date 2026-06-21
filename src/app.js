
const express = require('express');
const cookies = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookies());
app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);

module.exports = app;