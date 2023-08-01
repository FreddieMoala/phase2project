import React from 'react';
import './Styles.css';
import Legend from './Legend';
import BeerAPI from './BeerAPI';
import Button from './Button';


export default function BeerInfo ({beerData, refetchData}) {
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
  
  return (
    <React.Fragment>
      <div className="App">
              <h1 className="header">Show me the Beer!</h1>
              <Button refetchData={refetchData}/>
            </div>
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
                  <tr>
                    <th>IBU</th>
                    <th>SRM</th>
                    <th>Attenuation Level</th>
                  </tr>
                  <tr>
                    <td className="ibu">{beerData.ibu}</td>
                    <td className="srm">{beerData.srm}</td>
                    <td className="aLevel">{beerData.attenuation_level}</td>
                  </tr>
                </table>
                <Legend />
              </div>
          </div>
    </React.Fragment>
  );
};

