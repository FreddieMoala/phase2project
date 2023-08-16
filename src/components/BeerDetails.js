import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchFavoritesAPI } from './apiServices';

export default function BeerDetails() {
    const { id } = useParams();
    const [beer, setBeer] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBeerById = async () => {
            try {
                const data = await fetchFavoritesAPI();
                console.log("fetched beers:", data);
                const selectedBeer = data.find(b => b.id === parseInt(id));
                setBeer(selectedBeer);
                setLoading(false);
            }catch (error) {
                console.error('Error fetching beer details:', error);
                setLoading(false);
            }
        };
        fetchBeerById();
    }, [id]);

    // if(loading) return <div>Loading...</div>;

    return (
        <table>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{beer.name}</td>
                </tr>
                <tr>
                    <td>Description</td>
                    <td>{beer.description}</td>
                </tr>
                <tr>
                    <td>Malt</td>
                    <td>
                        {beer.ingredients && beer.ingredients.malt && beer.ingredients.malt.map((ingredient, index) => (
                            <p key={index}>
                                {ingredient.name}: {ingredient.amount.value} {ingredient.amount.unit}
                            </p>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>Hops</td>
                    <td>
                        {beer.ingredients && beer.ingredients.hops && beer.ingredients.hops.map((ingredient, index) => (
                            <p key={index}>
                                {ingredient.name}: {ingredient.amount.value} {ingredient.amount.unit}
                            </p>
                        ))}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}
