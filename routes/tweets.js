var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const token = uid2(32);

const User = require("../models/users");
const Tweet = require("../models/tweets");
const { checkBody } = require("../modules/checkBody");

router.post("/", (req, res) => {
  // check if tweet is empty
  if (!checkBody(req.body, ["message"])) {
    res.json({ result: false, error: "Empty field" });
    return;
  }
  // check if tweet is 280 words max
  if (req.body.message.length > 280) {
    res.json({ resultat: false, error: "number of characters exceeded" });
  } else {
    const regex = /#[a-z]*/gi;
    const hastag = req.body.message.match(regex);

    User.findOne({
      token: req.body.token,
    }).then((data) => {
      if (data) {
        const newTweet = new Tweet({
          date: Date.now(),
          message: req.body.message,
          hashtag: hastag,
          nb_of_likes: 0,
          user: data.id,
        });
        // save the new tweet
        newTweet.save().then((newDoc) => {
          res.json({ result: true, user: newDoc.user });
        });
      } else {
        res.json({ result: false, error: "not userID" });
      }
    });
  }
});

router.get("/findbyhashtag/:hashtag", (req, res) => {
  Tweet.find({
    hashtag: req.params.hashtag,
  }).then((data) => {
    if (data) {
      console.log(data);
      res.json({ result: true, message: data });
    } else {
      res.json({ result: false, error: "tweet not found" });
    }
  });
});

router.get("/", (req, res) => {
  Tweet.find().then((data) => {
    if (data) {
      res.json({ result: true, message: data });
    } else {
      res.json({ result: false, error: "tweet not found" });
    }
  });
});

router.get("/hashtags", (req, res) => {
  Tweet.find().then((data) => {
    if (data.hashtag) {
      console.log(data.hashtag);
      res.json({ result: true, message: data });
    } else {
      res.json({ result: false, error: "hashtag not found" });
    }
  });
});

//   router.get ("/alltweets", (req,res)=>{
//     fetch(`https://newsapi.org/v2/top-headlines?sources=the-verge&apiKey=${NEWS_API_KEY}`)
//     .then (response => response.json())
//     .then (data => {
//         if (data.status  === "ok"){
//             res.json ({tweets: data.articles})
//         } else{
//             res.json ({articles:[]});
//         }

//     });
// });

module.exports = router;
