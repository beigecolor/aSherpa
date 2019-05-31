const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  phoneNumber: Number,
  email: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;