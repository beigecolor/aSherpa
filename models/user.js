const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: Number,
  address: {
    street: String,
    city: String,
    zipCode: Number,
    country: String
  },
  signUpDate: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
