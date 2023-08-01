import React, { useState, useEffect } from 'react';
import BeerInfo from './BeerInfo';

export default function BeerAPI() {
  const [beerData, setBeerData] = useState(null);

  useEffect(() => {
    const fetchBeerData = async () => {
      try {
        const response = await fetch('https://api.punkapi.com/v2/beers/random');
        const data = await response.json();
        setBeerData(data[0]);
      } catch (error) {
        console.error('Error fetching beer data:', error);
      }
    };

    fetchBeerData();
  }, []);

  const refetchData = async () => {
    try {
      const response = await fetch('https://api.punkapi.com/v2/beers/random');
      const data = await response.json();
      setBeerData(data[0]);
      return data[0];
    } catch (error) {
      console.error('Error fetching beer data:', error);
      return null;
    }
  };

  return (
    <div>
      <BeerInfo beerData={beerData} refetchData={refetchData} />
    </div>
  );
};
