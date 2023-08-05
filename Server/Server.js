const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// In-memory storage for favorite beers
const favoriteBeers = [];

// Add a favorite beer
app.post('/favorites', (req, res) => {
  const newFavorite = req.body;
  favoriteBeers.push(newFavorite);
  res.status(201).json(newFavorite);
});

// Get all favorite beers
app.get('/favorites', (req, res) => {
  res.json(favoriteBeers);
});

// Filter favorites by SRM value
app.get('/favorites/filter/:srm', (req, res) => {
  const filteredFavorites = favoriteBeers.filter(beer => beer.srm === parseInt(req.params.srm));
  res.json(filteredFavorites);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

