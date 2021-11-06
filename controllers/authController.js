const User = require('../models/User');
const { compare } = require('bcryptjs');
const { validationResult } = require('express-validator');
const { sign } = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Non-existent User' });
    }
    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({ msg: 'Wrong Password' });
    }
    const payload = {
      user: { id: user.id },
    };
    sign(payload, process.env.SECRET, { expiresIn: 86400 }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};

exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};
