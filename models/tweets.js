const mongoose = require("mongoose");

const TweetSchema = mongoose.Schema({
  date: Date,
  message: String,
  hashtag: [String],
  nb_of_likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Tweet = mongoose.model("tweets", TweetSchema);

module.exports = Tweet;
