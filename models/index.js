const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/finalproject", {useNewUrlParser: true, useFindAndModify: false});

module.exports = {
  User: require('./user')
}