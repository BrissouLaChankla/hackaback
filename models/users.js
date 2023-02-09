const mongoose = require ("mongoose");

const UserSchema = mongoose.Schema ({
    firstname: String,
    username: String,
    password: String,
    token: String,
});

const User = mongoose.model ("users", UserSchema)

module.exports = User;