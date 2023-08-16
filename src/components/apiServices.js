const BASE_URL = 'http://api.punkapi.com/v2';

// Fetch a random beer
export const fetchBeerData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/beers/random`);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching beer data:', error);
        throw error;
    }
};

// Fetch favorites (assuming you have an endpoint for this)
export const fetchFavoritesAPI = async () => {
    try {
        const response = await fetch('http://localhost:3001/favorites');
        if (!response.ok) throw new Error(`Error fetching favorites: ${response.status} ${response.statusText}`);

        return await response.json();
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
};

// Delete favorite by ID
export const deleteFavoriteByIdAPI = async (id) => {
    try {
        const response = await fetch(`http://localhost:3001/favorites/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error removing from favorites: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

// Add to favorites
export const addToFavoritesAPI = async (beer) => {
    try {
        const response = await fetch('http://localhost:3001/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(beer),
        });

        if (!response.ok) {
            throw new Error(`Error adding to favorites: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error("Error adding beer to favorites:", error);
        throw error;
    }
};
