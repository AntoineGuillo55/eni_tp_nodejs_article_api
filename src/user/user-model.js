const mongoose = require('mongoose');

const User = mongoose.model('User', {id: String, email : String, password: String}, "users");

module.exports = {
    User
}