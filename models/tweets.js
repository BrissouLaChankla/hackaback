const mongoose = require("mongoose");

const TweetSchema = mongoose.Schema({
  date: Date,
  message: String,
  hashtag: [String],
  hasliked: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Tweet = mongoose.model("tweets", TweetSchema);

module.exports = Tweet;
