const { verify } = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Invalid Permission' });
  }
  try {
    const encrypted = verify(token, process.env.SECRET);
    req.user = encrypted.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Invalid Token' });
  }
};
