const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const db = require('./models');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
mongoose.connect('mongodb://localhost/finalproject', { useNewUrlParser: true} );
// * DATA

// *allow CORS

// *Routes //

app.get("/", (req, res) => {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all users
app.get('/api/users', function(req, res) {
  db.User.find(function(err, users){
    if (err) {
      console.log('error:' + err);
      res.sendStatus(500);
    }
    res.json(users);
  });
});

app.post('/api/users', function (req, res) {
  db.User.create(req.body, (err, newUser) => {
    if (err) return res.status(500).json({msg: 'something went terribly wrong'});
    res.json(newUser);
  });
});


// * Server Start 
app.listen(process.env.PORT || 3000, () => console.log('Sherpa app listening at http://localhost:3000'));