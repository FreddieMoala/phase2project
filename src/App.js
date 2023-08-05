import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import BeerAPI from "./components/BeerAPI";
import BeerInfo from "./components/BeerInfo";
import './components/Styles.css'
import ConfirmAge from "./components/ConfirmAge";
import Wrapper from "./components/Wrapper";



export default function App () {
  const [beerData, setBeerData] = useState(null);
  const [isFetching, setFetching] = useState(false);
  const [favorites, setFavorites] = useState([]);

 

  const refetchData = async () => {
    try {
      setFetching(true);
      const response = await fetch('https://api.punkapi.com/v2/beers/random');
      const data = await response.json();
      setBeerData(data[0]); 
      setFetching(false);
      return data[0];
    } catch (error) {
      console.log('Error fetching beer data:', error);
      setFetching(false);
      return null;
    }
  }

  const addToFavorites = (beer) => {
    setFavorites((prevFavorites) => [...prevFavorites, beer]);
    
  };
  

  return (
    <div>
    <Router>
      <Wrapper>
      <Routes>
        <Route path="/" element={<ConfirmAge />} />
        <Route path="/beer_info" element={<BeerInfo beerData={beerData} addToFavorites={addToFavorites}/>} />
        <Route path="/beer_gen" element={<BeerAPI refectching={refetchData}/>} />
        
      </Routes>
      </Wrapper>
    </Router>
    </div>
    
  );
  
};


