require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser')
const path = require('path');
const port = process.env.PORT || 3000;

// db.pokemon.findOne().then(function(pokemon){
//   console.log(pokemon);
// })

// db.pokemon.findOne({
//   where: {
//     name: 'Pikachu'
//   }
// })
// .then(function(pokemon){
// console.log(pokemon);
// })

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use('/pokemon', require('./routes/pokemon.js'))

// GET / - main index of site
app.get('/', function(req, res) {
  var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// Imports all routes from the pokemon routes file
app.use('/pokemon', require('./routes/pokemon'));

var server = app.listen(port, function() {
  console.log('...listening on', port );
});


module.exports = server;
