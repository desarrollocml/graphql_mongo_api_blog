const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]  
  console.log("-->",token);
  next();
};
module.exports = {
  authenticate,
};
