const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
// * DATA

const cities = [
  {
    name: 'san ramon',
    description: 'cool city'
  },
  {
    name: 'san francisco',
    descritption: 'crazy city'
  },
  {
    name: 'san diego',
    description: 'chill city'
  }
];


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

app.post('/api/cities', function citiesCreate(request, response) {
  let name = request.body.name;
  let desc = request.body.description;
  let newCity = { name: name, description: desc };
  // if we have a cities array in our app (pre-database):
  cities.push(newCity);
  response.json(cities);
});


// * Server Start 
app.listen(3000, () => {
  console.log('Http server listening at localhost: 3000');
});