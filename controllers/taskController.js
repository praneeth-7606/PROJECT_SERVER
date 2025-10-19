const Task = require('../models/Task');

// Get all tasks for a project
exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId }).sort({ order: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || 'To Do',
    projectId: req.body.projectId,
    order: req.body.order || 0
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.status !== undefined) task.status = req.body.status;
    if (req.body.order !== undefined) task.order = req.body.order;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Bulk update tasks (for drag and drop reordering)
exports.bulkUpdateTasks = async (req, res) => {
  try {
    const updates = req.body.tasks; // Array of {id, status, order}
    
    const updatePromises = updates.map(update => 
      Task.findByIdAndUpdate(
        update.id,
        { status: update.status, order: update.order },
        { new: true }
      )
    );

    const updatedTasks = await Promise.all(updatePromises);
    res.json(updatedTasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
