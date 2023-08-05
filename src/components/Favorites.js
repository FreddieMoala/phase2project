import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Favorites({}) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchFavorites();
    },[]);

    const fetchFavorites = async () => {
        try{
            const response = await fetch('http://localhost:3001/favorites',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data= await response.json();
                setFavorites(data);
            } else {
                console.error('Error fetching favorites:',response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    return (
        <div>
            <h1>Favorites List</h1>
            {favorites.length > 0 ? (
                    favorites.map((beer) => (
                      <div key={beer.id}>
                        <Link to={`/beer_info/${beer.id}`}>{beer.name}</Link>
                      </div>
                    ))
                  ) : (
                    <p>No favorite beers yet.</p>
                  )}
                </div>
    );
};
