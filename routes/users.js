const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const { check } = require('express-validator');

router.post(
  '/',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Password Must Contain at Least 6 Characters').isLength({
      min: 6,
    }),
  ],
  createUser
);

module.exports = router;
