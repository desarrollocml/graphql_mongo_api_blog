const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET } = require("../util/auth");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const verified = jsonwebtoken.verify(token, JWT_SECRET);
    //console.log("-->", verified);
    req.verifiedUser = verified.user;
    next();
  } catch (error) {
    next();
  }
};
module.exports = {
  authenticate,
};
