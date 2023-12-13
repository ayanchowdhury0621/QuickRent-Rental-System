// popularProducts.js
import axios from 'axios';

export async function fetchPopularProducts() {
  try {
    const response = await axios.get('http://localhost:5000/popular-products');
    return response.data.products;
  } catch (error) {
    console.error("Fetching popular products failed:", error);
    return [];
  }
}
