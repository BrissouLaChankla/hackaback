const mongoose = require("mongoose");

const TweetSchema = mongoose.Schema({
  date: Date,
  message: String,
  hashtag: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  hasliked: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const Tweet = mongoose.model("tweets", TweetSchema);

module.exports = Tweet;
