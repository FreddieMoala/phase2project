import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BeerInfo from './BeerInfo';
import { fetchBeerData, fetchFavoritesAPI, deleteFavoriteByIdAPI, addToFavoritesAPI } from './apiServices'; // Assuming you have these functions in BeerAPI.js

export default function Favorites({ handleReset }) {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const data = await fetchFavoritesAPI();
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setError("Failed to fetch favorites. Please try again.");
        }
    };

    const removeFavorite = async (id) => {
        try {
            await deleteFavoriteByIdAPI(id);
            setFavorites((prevFavorites) => prevFavorites.filter((beer) => beer.id !== id));
        } catch (error) {
            console.error('Error:', error);
            setError("Failed to remove favorite. Please try again.");
        }
    };

    const handleAddToFavorites = async (beer) => {
        try {
            await addToFavoritesAPI(beer);
            fetchFavorites();
        } catch (error) {
            console.error("Error adding beer to favorites:", error);
            setError("Failed to add beer to favorites. Please try again.");
        }
    };

    return (
        <div>
            <h1>Favorites List</h1>
            {error && <p className="error">{error}</p>}
            <section>
                {favorites.length > 0 ? (
                    <>
                        {favorites.map((beer) => (
                            <div key={beer.id}>
                                <Link to={`/beer_info/${beer.id}`}>{beer.name}</Link>
                                <button onClick={() => removeFavorite(beer.id)}>Remove</button>
                            </div>
                        ))}
                    </>
                ) : (
                    <p>No favorite beers yet.</p>
                )}
            </section>
            <BeerInfo addToFavorites={handleAddToFavorites} fetchBeerData={fetchBeerData} />
            <button onClick={handleReset} disabled={favorites.length === 0}>
                Reset Favorites
            </button>
        </div>
    );
}
