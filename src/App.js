import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BeerAPI from "./components/BeerAPI";
import BeerInfo from "./components/BeerInfo";
// import FoodPairing from "./components/FoodPairing";
import Button from "./components/Button";
import './components/Styles.css'
import ConfirmAge from "./components/ConfirmAge";

const App = () => {
  const [isFetching, setFetching] = useState(false);

  const refetchData = async () => {
    try{
      setFetching(true);
      const response = await fetch ('https://api.punkapi.com/v2/beers/random');
      const data = await response.json();
      setFetching(false);
      return data[0];
    } catch (error) {
      console.log('Error fetching bee data:', error);
      setFetching(false);
      return null;
    }
  }
  
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ConfirmAge />} />
        <Route path="/beer_gen" element={<BeerAPI refetchData={refetchData} />} />
        <Route path="/beer_info" element={<BeerInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
