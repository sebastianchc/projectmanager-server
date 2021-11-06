const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { check } = require('express-validator');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');

router.post(
  '/',
  auth,
  [check('name', 'Name id Required').not().isEmpty()],
  createTask
);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
