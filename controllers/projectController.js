const Project = require('../models/Project');
const Task = require('../models/Task');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdDate: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  const project = new Project({
    name: req.body.name,
    description: req.body.description
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.body.name) project.name = req.body.name;
    if (req.body.description) project.description = req.body.description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete all tasks associated with this project
    await Task.deleteMany({ projectId: req.params.id });
    
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project and associated tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
