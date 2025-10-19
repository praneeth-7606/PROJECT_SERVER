const Task = require('../models/Task');
const geminiService = require('../services/geminiService');

// Summarize all tasks in a project
exports.summarizeProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    const summary = await geminiService.summarizeTasks(tasks);
    res.json({ summary });
  } catch (error) {
    console.error('Error in summarizeProjectTasks:', error);
    res.status(500).json({ message: error.message });
  }
};

// Answer questions about tasks
exports.askQuestion = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const tasks = await Task.find({ projectId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this project' });
    }

    const answer = await geminiService.answerQuestion(question, tasks);
    res.json({ question, answer });
  } catch (error) {
    console.error('Error in askQuestion:', error);
    res.status(500).json({ message: error.message });
  }
};

// Analyze a specific task
exports.analyzeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const analysis = await geminiService.analyzeTask(task);
    res.json({ analysis });
  } catch (error) {
    console.error('Error in analyzeTask:', error);
    res.status(500).json({ message: error.message });
  }
};
