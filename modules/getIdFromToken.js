function getIdFromToken(body) {
  const userId="";
  User.findOne({token: body})
  .then((dataUser) => {
    if (dataUser) {
      console.log(dataUser);
      res.json({ result: true, message: dataUser.id });
    }
  });
    return userId;
  }
  
  module.exports = { getIdFromToken};