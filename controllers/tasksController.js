const { validationResult } = require('express-validator');
const Projects = require('../models/Projects');
const Tasks = require('../models/Tasks');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { project } = req.body;
  try {
    const exist = await Projects.findById(project);
    if (!exist) {
      return res.status(404).json({ msg: 'Project not Found' });
    }
    if (exist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    const task = new Tasks(req.body);
    task.save();
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { project } = req.query;
    const exist = await Projects.findById(project);
    if (!exist) {
      return res.status(404).json({ msg: 'Project not Found' });
    }
    if (exist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    const tasks = await Tasks.find({ project }).sort({ _id: -1 });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { project, name, status } = req.body;
    let task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not Found' });
    }
    const projectExist = await Projects.findById(project);
    if (projectExist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    const newTask = {};
    newTask.name = name;
    newTask.status = status;
    task = await Tasks.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.query;
    const task = await Tasks.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not Found' });
    }
    const projectExist = await Projects.findById(project);
    if (projectExist.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }
    await Tasks.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Task Deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};
