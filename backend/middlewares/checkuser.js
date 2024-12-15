const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const checkuser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    req.user = "not_login";
    next();
  }else{
    const token = authorizationHeader.slice(7).replace(/"/g, ''); 
  jwt.verify(token,secretKey, (err, decoded) => {
    req.user = decoded;
    next();
  });
}
};

module.exports = checkuser;
