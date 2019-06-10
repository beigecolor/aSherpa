const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const app = express();
// const mongoose = require("mongoose");
const db = require("./models");
const PORT = process.env.PORT || 4000;

// * view engine
app.set("view engine", "ejs");

// *----------------------------middleware-------------------//
// * serve public directory
app.use(express.static(__dirname + "/public"));

//  * parse Url encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// * parse JSON data
app.use(bodyParser.json());

//  * express session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "SSShhh, this is a secet...",
    resave: false,
    saveUninitialized: false
  })
);

// *allow CORS
// *------------------------------ Routes------------------ //

// * get root route
app.get("/", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  res.render("dashboard", { currentUser: req.session.currentUser });
});

// get profile route
app.get("/profile", (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  res.render("profile", { currentUser: req.session.currentUser });
});

// new user route
app.get("/signup", (req, res) => {
  res.render("auth/signup", { currentUser: req.session.currentUser });
});

//POST create user route
app.post("/signup", (req, res) => {
  const errors = [];

  // validate form data
  if (!req.body.name) {
    errors.push({ message: "please enter name" });
  }

  if (!req.body.firstName) {
    errors.push({ message: "Please enter your firsname" });
  }

  if (!req.body.email) {
    errors.push({ message: "Please enter your email" });
  }

  if (!req.body.password) {
    errors.push({ message: "Please enter your password" });
  }

  if (req.body.password !== req.body.password2) {
    errors.push({ message: "Your password do not match" });
  }

  //validation errors re-render signup page with error messages
  if (errors.length) {
    return res.render("auth/signup", {
      user: req.body,
      errors: errors,
      currentUser: req.sesssion.currentUser
    });
  }

  // generate salt for password hash complexity
  bcrypt.genSalt(10, (err, salt) => {
    if (err)
      return res.render("auth/signup", {
        user: req.body,
        errors: [{ message: "Something went wrong try again" }]
      });

    // hash user password from signup form
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err)
        return res.render("auth/signup", {
          user: req.body,
          errors: [{ message: "something went wrong" }]
        });

      //create an object to hold the new user information
      const newUser = {
        name: req.body.name,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        city: req.body.city,
        zipCode: req.body.zipCode,
        country: req.body.country,
        email: req.body.email,
        password: hash
      };

      //create a new user record in mongodb form the newuser object above
      db.User.create(newUser, (err, newUser) => {
        if (err) return res.render("auth/signup", { errors: [err] });
        //if new user is created with success redirect to login page
        //we can create the session to go to dashboard
        res.redirect("/login");
      });
    });
  });
});

// Get Login Route
app.get("/login", (req, res) => {
  res.render("auth/login", { currentUser: req.session.currentUser });
});

// POST login route
app.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.render("auth/login", {
      user: req.body,
      errors: [{ message: "Please enter your email and password" }]
    });
  }

  //find user by email
  db.User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err)
      return res.render("auth/login", {
        user: req.body,
        errors: [{ message: "something went wrong please try again" }]
      });

    if (!foundUser) {
      return res.render("auth/login", {
        user: req.body,
        errors: [{ message: "Username or password is incorrect" }]
      });
    }

    //code runs means ok!
    //compare password with user and found user
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err)
        return res.render("auth/login", {
          user: req.body,
          errors: [{ message: "Something went wrong. Please try again" }]
        });

      //if password match create a new session with loggedin and current user properties
      if (isMatch) {
        req.session.loggedIn = true;
        req.session.currentUser = {
          name: foundUser.name,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          phoneNumber: foundUser.phoneNumber,
          street: foundUser.street,
          city: foundUser.city,
          zipCode: foundUser.zipCode,
          country: foundUser.country,
          signUpDate: foundUser.signUpDate,
          email: foundUser.email
        };
        // redirect user to dashboard
        return res.render("dashboard", {
          currentUser: req.session.currentUser
        });
      } else {
        //password not match render login with error
        return res.render("auth/login", {
          user: req.body,
          error: [{ message: "username or password is incorrect" }]
        });
      }
    });
  });
});

//delete user

//Get Logout Route
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err)
      return res.render("auth/login", {
        user: req.body,
        errors: [{ message: "Something went wrong. Please try again" }]
      });
    res.redirect("/login");
  });
});

// * ---------------------------------API ROUTES ---------------------------------------//

// helper route(see users in the database)
app.get("/api/v1/users", (req, res) => {
  db.User.find((err, allUsers) => {
    if (err) res.json(err);
    res.json(allUsers);
  });
});

app.delete("/api/v1/users/:id", (req, res) => {
  console.log("DELETE USER ID = ", req.params.id);
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
    if (err) {
      return res.json(err);
    }
    res.redirect("/login");
  });
});

app.put("/api/v1/users/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }).exec(
    (err, updatedUser) => {
      if (err) {
        return res.json(err);
      }
      res.json(updatedUser);
    }
  );
});

app.get("/api/v1/users/:id", (req, res) => {
  console.log(req.params.id);
  db.User.findById(req.params.id, req.body, { new: true }).exec(
    (err, foundUser) => {
      if (err) {
        return res.json(err);
      }
      res.json(foundUser);
    }
  );
});

// * Server Start
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// router.get('/userlist', function(req, res) {
//   var db = req.db;
//   var collection = db.get('usercollection');
//   collection.find({},{},function(e,docs){
//       res.render('userlist', {
//           "userlist" : docs
//       });
//   });
// });
