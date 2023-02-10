function getIdFromToken(body, keys) {
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
    return isValid;
  }
  
  module.exports = { getIdFromToken };