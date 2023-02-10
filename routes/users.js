var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const token = uid2(32);

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");


router.post("/signup", (req, res) => {
  // check if signup data is valid
  if (!checkBody(req.body, ["firstname", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty field" });
    return;
  }
  // check if user is already registred
  User.findOne({ username: req.body.username }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      // user is not yet registred => creat new user par rapport au UserSchema
      const newUser = new User({
        firstname: req.body.firstname,
        username: req.body.username,
        password: hash,
        token: uid2(32),
      });
      // save the new user
      newUser.save().then((newDoc) => {
        res.json({ result: true, firstname:newDoc.firstname, username: newDoc.username, token: newDoc.token, id:newDoc._id });
      });
    } else {
      // user is already registered
      res.json({ result: false, error: "user already exists" });
    }
  });
});

router.post("/signin", (req, res) => {
  // check if signup data is valid
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty field" });
    return;
  }
  // check if user is already registred
  User.findOne({
    username: req.body.username,
  }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      // user is registred
      res.json({ result: true, firstname:data.firstname, username: data.username, token: data.token,id:data._id });
    } else {
      // user was not found DB
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

// /* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

module.exports = router;
