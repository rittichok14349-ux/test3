const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(
    payload, // { userId, role }
    secretKey,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
