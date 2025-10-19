const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Get all tasks for a project
router.get('/project/:projectId', taskController.getTasksByProject);

// Get single task
router.get('/:id', taskController.getTaskById);

// Create new task
router.post('/', taskController.createTask);

// Update task
router.put('/:id', taskController.updateTask);

// Bulk update tasks (for drag and drop)
router.put('/bulk/update', taskController.bulkUpdateTasks);

// Delete task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
