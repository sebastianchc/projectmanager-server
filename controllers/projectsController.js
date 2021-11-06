const { validationResult } = require('express-validator');
const Projects = require('../models/Projects');

exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const project = new Projects(req.body);
    project.owner = req.user.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Projects.find({ owner: req.user.id });
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};

exports.updateProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name } = req.body;
  const newProject = {};
  if (name) {
    newProject.name = name;
  }
  try {
    let project = await Projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not Found' });
    }
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    project = await Projects.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    let project = await Projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not Found' });
    }
    if (project.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    await Projects.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Project Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};
