const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes'); 
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads')); 
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes); 

connectDB();

module.exports = app;
