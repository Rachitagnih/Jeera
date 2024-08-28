const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  const options = {
    expiresIn: '1h', // Token expiration time
  };

  const token = jwt.sign(payload, process.env.JWT_Secret, options);
  return token;
};

module.exports = {
  generateToken,
};