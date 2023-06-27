const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(404).json({ message: "No token found" });
  }
  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
    if (err) {
      return res.status(400);
    }
    console.log(user.email + " email inside the verify token");
    req.email = user.email;
  });
  next();
};

module.exports = verifyToken;
