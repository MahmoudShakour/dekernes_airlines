const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  

  if (!token) {
    res.status(401).json({ message: "you need to sign in" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      res
        .status(403)
        .json({ message: "token is no longer valid" });
    }
    req.user = user;
    next();
  });
};

module.exports = authToken;