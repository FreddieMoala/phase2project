import React, {useState, useEffect} from 'react';
import './Styles.css';
import Legend from './Legend';
import ButtonCall from './ButtonCall';
import Favorites from "./Favorites";


export default function BeerInfo ({beerData, refetchData, addToFavorites}) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error fetching favorites:', error));

  }, []);
  


if (!beerData) {
  return <p>Loading...</p>;
}


 
  const fallBackUrl = 'https://www.wallpics.net/wp-content/uploads/2018/10/Beer-Background-image.jpg';

  
  const getBackgroundColor = (srmValue) => {
    

    if (srmValue < 5) {
      return 'lightyellow';
    } else if (srmValue >= 5 && srmValue < 10) {
      return 'gold';
    } else if (srmValue >= 10 && srmValue < 15) {
      return 'amber';
    } else if (srmValue >= 15 && srmValue < 20) {
      return 'darkOrange';
    } else if (srmValue >= 20 && srmValue < 25) {
      return 'brown';
    } else if (srmValue >= 25 && srmValue < 30) {
      return 'darkBrown';
    } else {
      return 'grey';
    }
  };
  
    const backgroundColor = getBackgroundColor(beerData.srm);

    const handleAddToFavorites = () => {
      fetch('http://localhost:3001/favorites', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(beerData),
      })
        .then(response => response.json())
        .then(newFavorite => {
          setFavorites(prevFavorites => [...prevFavorites, newFavorite]);
        })
        .catch(error => {
          console.error('Error adding to favorites: ', error);
        });
    };
    
    
  return (
    <React.Fragment>
      <div className="App">
          <h1 className="header">Show me the Beer!</h1>
          <ButtonCall handleAddToFavorites={handleAddToFavorites} beerData={beerData} refetchData={refetchData}/>
        </div>
            {/* <Favorites favorites={favorites} /> */}
            
       <div className="container">
       <p className="description"></p>
            <div style={{ backgroundColor }} className="leftColumn">
              <h1>{beerData.name}</h1>
               <div className="foodPair">
                <img className="imgInfo" src={beerData.image_url || fallBackUrl} alt="Craft Beer"/>
                <h2>Food Pairing</h2>
                <ul className="food-list">
                  {beerData.food_pairing && 
                  beerData.food_pairing.map((food, index) => (
                    <li key={index}>{food}</li>))}
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
    </React.Fragment>
  );
  
};

