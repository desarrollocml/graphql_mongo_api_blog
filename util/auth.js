const jwt = require("jsonwebtoken");
const JWT_SECRET = "hello123";
const JWT_EXPIRES_IN = "1h";

const createJWTToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

module.exports = {
  createJWTToken,
  JWT_SECRET
};
