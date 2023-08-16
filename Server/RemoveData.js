import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3001/favorites'; // Change this to your server's API endpoint

async function removeAllData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length === 0) {
      console.log('No data to remove.');
      return;
    }

    // Send a DELETE request to remove all data
    const deleteResponse = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (deleteResponse.ok) {
      console.log('All data removed successfully.');
    } else {
      console.error('Error removing data:', deleteResponse.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

removeAllData();
