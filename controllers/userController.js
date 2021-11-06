const User = require('../models/User');
const { genSalt, hash } = require('bcryptjs');
const { validationResult } = require('express-validator');
const { sign } = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Existing User' });
    }
    user = new User(req.body);
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
    const payload = {
      user: { id: user.id },
    };
    sign(payload, process.env.SECRET, { expiresIn: 3600 }, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'There was an Error' });
  }
};
