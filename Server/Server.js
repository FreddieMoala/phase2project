import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Setup CORS to allow specific domains or use default
const whitelist = ['http://localhost:3000'];  // You can add more domains here
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

// In-memory storage for favorite beers
const favoriteBeers = [];
let beerIdCounter = 1;  // A simple counter to assign unique IDs

// Middleware for error handling
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
}

// Data validation middleware for favorite beers
function validateBeerData(req, res, next) {
    const { name, srm } = req.body;

    if (!name || typeof srm !== 'number') {
        return res.status(400).json({ message: 'Invalid beer data provided.' });
    }
    next();
}

// Add a favorite beer
app.post('/favorites', validateBeerData, (req, res) => {
    const newFavorite = { ...req.body, id: beerIdCounter++ };
    favoriteBeers.push(newFavorite);
    res.status(201).json(newFavorite);
});

// Get all favorite beers
app.get('/favorites', (req, res) => {
    res.json(favoriteBeers);
});

// Delete a specific favorite beer by ID
app.delete('/favorites/:id', (req, res) => {
    const beerId = req.params.id;
    const initialLength = favoriteBeers.length;

    // Filter out the beer that matches the given ID
    const updatedFavorites = favoriteBeers.filter(beer => beer.id !== parseInt(beerId));

    // Update the favoriteBeers array
    favoriteBeers.length = 0;
    favoriteBeers.push(...updatedFavorites);

    if (favoriteBeers.length === initialLength) {
        return res.status(404).json({ message: 'Beer not found.' });
    }

    res.status(200).json({ message: 'Beer removed successfully.' });
});

// Filter favorites by SRM value
app.get('/favorites/filter/:srm', (req, res) => {
    const filteredFavorites = favoriteBeers.filter(beer => beer.srm === parseInt(req.params.srm));
    res.json(filteredFavorites);
});

// Use the error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
