const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
// * DATA



// *allow CORS
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// *Routes //

app.get("/", (req, res) => {
  res.sendFile('views/index.html' , { root : __dirname});
});

// * Server Start 
app.listen(3000, () => {
  console.log('Http server listening at localhost: 3000');
});