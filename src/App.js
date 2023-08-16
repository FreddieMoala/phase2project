import React, { useState, useEffect } from 'react';
import BeerInfo from './components/BeerInfo';
import Favorites from './components/Favorites';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConfirmAge from './components/ConfirmAge';
import { fetchBeerData as fetchBeerFromAPI, fetchFavoritesAPI, addToFavoritesAPI as addToFavoritesService, fetchBeerData } from './components/apiServices'; 
import NavBar from './components/NavBar';
import BeerDetails from './components/BeerDetails';

export default function App() {
    const [beerData, setBeerData] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

    const handleAgeConfirmation = (isLegalAge) => {
        setIsAgeConfirmed(isLegalAge);
    };
// console.log(fetchBeerData);
    const fetchRandomBeer = async () => {
        try {
            const data = await fetchBeerFromAPI();
            setBeerData(data);
        } catch (error) {
            console.error("Error fetching beer data:", error);
        }
    };

    useEffect(() => {
        if (isAgeConfirmed) {
            fetchRandomBeer();
        }
    }, [isAgeConfirmed]);

    useEffect(() => {
        // Get the initial favorites when the component mounts
        const getInitialFavorites = async () => {
            try {
                const data = await fetchFavoritesAPI();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching initial favorites:', error);
            }
        };
        
        getInitialFavorites();
    }, []);

    const addToFavorites = async (beer) => {
        try {
            await addToFavoritesService(beer);
            setFavorites(prevFavorites => [...prevFavorites, beer]);  // Update the favorites in state
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    return (
        <Router>
            <div className="App">
            <NavBar favoritesCount={favorites.length} />
                {isAgeConfirmed ? (
                <>
                <h1>Beer App</h1>
        

                <Routes>

                    <Route path="/" element={<BeerInfo beerData={beerData} setBeerData={setBeerData} addToFavorites={addToFavorites} />} />
                    <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
                    <Route path="beer_info/:id" element={<BeerDetails />} />
                </Routes>
                </>
                ) : (
                    <ConfirmAge onConfirm={handleAgeConfirmation} />
                )}
            </div>
        </Router>
    );
}

