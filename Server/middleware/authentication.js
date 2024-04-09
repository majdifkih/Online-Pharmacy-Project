const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (token == null) {
      return res.status(401).send({ message: "Invalid token" });
    } else {
      let decodeToken = jwt.verify(token, process.env.SECRET_KEY);
      decodeToken
        ? ((req.userId = decodeToken.id),
          (req.userEmail = decodeToken.email),
          (req.userRole = decodeToken.role))
        : (req.user = null);
    }
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

module.exports = authenticate;
