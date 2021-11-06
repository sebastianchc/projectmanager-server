const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  authenticateUser,
  authenticatedUser,
} = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/', authenticateUser);
router.get('/', auth, authenticatedUser);

module.exports = router;
