import React from 'react';
import './Styles.css';
import Legend from './Legend';
import { fetchBeerData as getNewBeer } from './apiServices';  // Note the renamed import to avoid naming conflicts

export default function BeerInfo({ beerData, setBeerData, addToFavorites }) {
    
    if (!beerData) {
        return <p>Loading...</p>;
    }

    const handleGetBeerClick = async () => {
        try {
            const newData = await getNewBeer();  // Using the imported function
            setBeerData(newData);
        } catch (error) {
            console.error('Error fetching new beer:', error);
        }
    };
    console.log(beerData);
    const handleAddToFavoritesClick = () => {
        addToFavorites(beerData);
    };

    const getBackgroundColor = (srmValue) => {
        // Map SRM value to background color
        if (srmValue < 5) return 'lightyellow';
        if (srmValue < 10) return 'gold';
        if (srmValue < 15) return 'amber';
        if (srmValue < 20) return 'darkOrange';
        if (srmValue < 25) return 'brown';
        if (srmValue < 30) return 'darkBrown';
        return 'grey';
    };

    const backgroundColor = getBackgroundColor(beerData.srm);
    const fallBackUrl = 'https://www.wallpics.net/wp-content/uploads/2018/10/Beer-Background-image.jpg';

    return (
        <>
            <div className="App">
                <div className='box-button'>
                    <button onClick={handleGetBeerClick} className='beer-button'>
                        Get Another Beer
                    </button>
                    {beerData && (
                        <button onClick={handleAddToFavoritesClick} className='favorite-button'>
                            Add to Favorites
                        </button>
                    )}
                </div>
            </div>
            <div className="container">
                <p className="description">Description</p>
                <div style={{ backgroundColor }} className="leftColumn">
                    <h1>{beerData.name}</h1>
                    <div className="foodPair">
                        <img className="imgInfo" src={beerData.image_url || fallBackUrl} alt="Craft Beer" />
                        <h2>Food Pairing</h2>
                        <ul className="food-list">
                            {beerData.food_pairing && beerData.food_pairing.map((food, index) => (
                                <li key={index}>{food}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="rightColumn">
                    <table className="details">
                        <thead>
                            <tr>
                                <td>IBU</td>
                                <td>SRM</td>
                                <td>Attenuation Level</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="ibu">{beerData.ibu}</td>
                                <td className="srm">{beerData.srm}</td>
                                <td className="aLevel">{beerData.attenuation_level}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Legend />
                </div>
            </div>
        </>
    );
}
