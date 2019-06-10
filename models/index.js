const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/finalproject";

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("Mongodb connected...."))
  .catch(err => console.log(err));

module.exports = {
  User: require("./user")
};
