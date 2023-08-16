import React from 'react';

export default function ButtonCall({ beerData, setBeerData }) {
  const [favoriteBeers, setFavoriteBeers] = useState([]);

    const handleGetBeerClick = async () => {
        const newData = await refetchData();
        setBeerData(newData);
    };

    const handleAddToFavorites = async () => {
        const isAlreadyInFavorites = favoriteBeers.some(item => item.id === beerData.id);

        if (!isAlreadyInFavorites) {
            try {
                const response = await fetch('http://localhost:3001/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(beerData),
                });

                if (!response.ok) {
                    throw new Error('Failed to add to favorites.');
                }

                const newFavorite = await response.json();
                addToFavorites(newFavorite);
                setBeerData(null);
            } catch (error) {
                console.error('Error adding to favorites: ', error);
            }
        } else {
            console.log('Beer is already in the Favorites.');
        }
    };

   
  
    const addToFavorites = (beer) => {
      setFavoriteBeers((prevFavorites) => [...prevFavorites, beer]);
    };

    return (
        <div className='box-button'>
            <button onClick={handleGetBeerClick} className='beer-button'>
                Get Another Beer
            </button>
            <button onClick={handleAddToFavorites} className='favorite-button'>
                Add to Favorites
            </button>
        </div>
    );
}
