const express = require('express');
const File = require('../models/File');
const Project = require('../models/Project');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new file
router.post('/', auth, async (req, res) => {
  const { name, content, projectId } = req.body;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    // Check if the project exists and if the logged-in user owns it
    if (!project || project.owner.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Create a new file
    const file = new File({
      name,
      content,
      project: projectId, // Attach the file to the project
    });

    // Save the file to the database
    await file.save();

    // Add the file to the project's files array
    project.files.push(file._id);
    await project.save();

    // Send the created file as a response
    res.status(201).json(file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all files for a project
router.get('/:projectId', auth, async (req, res) => {
  try {
    // Find the project by ID
    const project = await Project.findById(req.params.projectId);

    // Check if the project exists and if the logged-in user owns it
    if (!project || project.owner.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Find all files belonging to the project
    const files = await File.find({ project: req.params.projectId });

    // Send the files as a response
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update a file
router.put('/:id', auth, async (req, res) => {
  const { name, content } = req.body;

  try {
    // Find the file by ID
    let file = await File.findById(req.params.id);

    // Check if the file exists
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    // Find the project the file belongs to
    const project = await Project.findById(file.project);

    // Check if the logged-in user owns the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update the file
    file.name = name;
    file.content = content;
    await file.save();

    // Send the updated file as a response
    res.json(file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete a file
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find the file by ID
    const file = await File.findById(req.params.id);

    // Check if the file exists
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    // Find the project the file belongs to
    const project = await Project.findById(file.project);

    // Check if the logged-in user owns the project
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete the file
    await file.remove();

    // Remove the file from the project's files array
    project.files = project.files.filter((fileId) => fileId.toString() !== req.params.id);
    await project.save();

    // Send a success message
    res.json({ msg: 'File deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;