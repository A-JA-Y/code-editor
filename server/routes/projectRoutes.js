const express = require('express');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new project
router.post('/', auth, async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new project
    const project = new Project({
      name,
      owner: req.user.id, // Attach the project to the logged-in user
    });

    // Save the project to the database
    await project.save();

    // Send the created project as a response
    res.status(201).json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all projects for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    // Find all projects owned by the logged-in user
    const projects = await Project.find({ owner: req.user.id });

    // Send the projects as a response
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a project
router.put('/:id', auth, async (req, res) => {
  const { name } = req.body;

  try {
    // Find the project by ID
    let project = await Project.findById(req.params.id);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if the logged-in user owns the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update the project
    project.name = name;
    await project.save();

    // Send the updated project as a response
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a project
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the project by ID
    const project = await Project.findById(req.params.id);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if the logged-in user owns the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete the project
    await project.remove();

    // Send a success message
    res.json({ msg: 'Project deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;