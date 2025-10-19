const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Summarize all tasks in a project
router.get('/summarize/:projectId', aiController.summarizeProjectTasks);

// Ask a question about project tasks
router.post('/ask/:projectId', aiController.askQuestion);

// Analyze a specific task
router.get('/analyze/:taskId', aiController.analyzeTask);

module.exports = router;
