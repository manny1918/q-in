const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Error('Please include all the fields');
  }
  res.send('OK');
});

const loginUser = asyncHandler(async (req, res) => {
  res.send('Login route');
});

module.exports = {
  registerUser,
  loginUser,
};
