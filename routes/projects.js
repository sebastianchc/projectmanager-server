const express = require('express');
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require('../controllers/projectsController');
const auth = require('../middleware/auth');
const router = express.Router();
const { check } = require('express-validator');

router.post(
  '/',
  auth,
  [check('name', 'Name id Required').not().isEmpty()],
  createProject
);
router.get('/', auth, getProjects);
router.put(
  '/:id',
  auth,
  [check('name', 'Name id Required').not().isEmpty()],
  updateProject
);
router.delete('/:id', auth, deleteProject);

module.exports = router;
