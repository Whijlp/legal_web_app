const jwt = require('jsonwebtoken');
const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};
const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
module.exports = { signToken, verifyToken };
