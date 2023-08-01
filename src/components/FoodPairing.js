import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';



export default function FoodPairing() {
    const [foodPairing, setFoodPairing] = useState('');

    useEffect(() => {
        fetchFoodPairing();
    }, []);

    const fetchFoodPairing = async () => {
        try {
        const response = await fetch('https://api.punkapi.com/v2/beers/random');
        const data = await response.json();
        setFoodPairing(data.foodPairing);
        } catch (error) {
        console.error('Error fetching food pairing:', error);
        }
    };

    return (
        <Fragment>
            <div className="foodPair">
            <h2>Food Pairing</h2>
            <h4 className="food-match">{foodPairing}</h4>
            </div>
            </Fragment>
    )
};


