require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-management';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Import routes
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Project Management API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      tasks: '/api/tasks',
      ai: '/api/ai'
    }
  });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
