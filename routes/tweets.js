var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const token = uid2(32);

const User = require("../models/users");
const Tweet =require("../models/tweets")
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
    // check if tweet is empty
    if (!checkBody(req.body, ["message"])) {
      res.json({ result: false, error: "Empty field" });
      return;
    } 
    // check if tweet is 280 words max
    if (req.body.message.length>280) {
        res.json ({ resultat: false, error:"number of characters exceeded"})
    } else {
        const regex=/#[a-z]*/gi;
        const hastag=req.body.message.match(regex);
        //creat new user par rapport au UserSchema
        const newTweet = new Tweet({
            date: new Date(),
            message: req.body.message ,
            hashtag: hastag,
            nb_of_likes: 0,
            user: "63e4de8bdd5dc4878befbb4e",
        });
        // save the new tweet
        newTweet.save().then((newDoc) => {
          res.json({ result: true, user: newDoc.user });
        });
      }
    });

module.exports = router;
