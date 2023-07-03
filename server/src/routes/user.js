var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var {
  isUserExists,
  getUsers,
  createUser,
} = require("../database/queries/queries.js");
const AuthUser = require("../middlewares/AuthUser.js");
const authToken = require("../middlewares/AuthToken.js");

router.post("/sign-up", async function (req, res, next) {
  const users = await isUserExists(req.body.username);

  if (users.length > 0) {
    res.status(403).json({ message: "username is taken" });
  } else {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        res.status(404).json({ message: "error has occured" });
      } else {
        const createdUser = await createUser([
          req.body.firstname,
          req.body.lastname,
          req.body.username,
          hashedPassword,
          req.body.email,
        ]);
        res.status(200).json(createdUser);
      }
    });
  }
});

router.post("/sign-in", AuthUser, async function (req, res, next) {
  const accessToken = jwt.sign(req.user, process.env.TOKEN_SECRET);
  res.json({ accessToken,user:req.user });
});

router.get("/users",authToken, async function (req, res, next) {
  const users = await getUsers();
  res.status(200).json(users);
});

module.exports = router;
