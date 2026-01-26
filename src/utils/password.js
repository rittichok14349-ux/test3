const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};
