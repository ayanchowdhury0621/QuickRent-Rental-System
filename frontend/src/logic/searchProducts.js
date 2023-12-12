// searchLogic.js
import axios from 'axios';

export async function searchProducts(query, userLocation) {
  try {
    const response = await axios.post('http://localhost:5000/search', { query, location: userLocation });
    return response.data.results;
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
