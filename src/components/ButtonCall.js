export default function ButtonCall({ beerData, refetchData }) {

  const handleGetBeerClick = async () => {
    await refetchData();
  };

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
        setFavorites(prevFavorites => [...prevFavorites, newFavorite]); // Using the prop addToFavorites
      })
      .catch(error => {
        console.error('Error adding to favorites: ', error);
      });
  };
  console.log(beerData);

  return (
    <div className='box-button'>
      <button onClick={handleGetBeerClick} className='beer-button'>
        Get Another Beer
      </button>
      <button onClick={handleAddToFavorites} className='favorite-button' >
        Add to Favorites
      </button>
    </div>
  );
};
