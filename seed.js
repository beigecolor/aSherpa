const db = require("./models");

const users_list = [
  {
    name: "brad",
    firstName: "john",
    lastName: "smith",
    phoneNumber: 555631923,
    street: "10 c sanson",
    city: "cebu city",
    zipcode: "98989",
    country: "philipiines",
    email: "johnsmith@mail.com"
  },
  {
    name: "steven",
    firstName: "johnson",
    lastName: "smith",
    phoneNumber: 555631923,
    street: "10 c san",
    city: "manila",
    zipcode: "98989",
    country: "philipiines",
    email: "smith@mail.com"
  },
  {
    name: "cyclops",
    firstName: "scott",
    lastName: "summers",
    phoneNumber: 555631923,
    street: "10 c castle",
    city: "new jersey",
    zipcode: "98999",
    country: "United States",
    email: "jo@mail.com"
  },
  {
    name: "dow",
    firstName: "jones",
    lastName: "dollar",
    phoneNumber: 555631923,
    street: "10 c balk",
    city: "bali",
    zipcode: "98989",
    country: "indonesia",
    email: "smad@mail.com"
  },
  {
    name: "kree",
    firstName: "john",
    lastName: "stodd",
    phoneNumber: 555631923,
    street: "10 c galaxy",
    city: "town",
    zipcode: "98989",
    country: "kree",
    email: "doomh@mail.com"
  }
];

// !remove all the records that match {} ALL records
db.User.deleteMany({}, function(err, users) {
  if (err) {
    console.log("error occured", err);
  } else {
    console.log("removed all users");

    // !create new record on the array user list
    db.User.create(users_list, function(err, users) {
      if (err) {
        return console.log("err", err);
      }
      console.log("created", users.length, "users");
      process.exit();
    });
  }
});
