import axios from 'axios';

// A utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Function to fetch and shuffle popular products
export async function fetchPopularProducts() {
  try {
    const response = await axios.get('http://localhost:5000/popular-products');
    let products = response.data.products;

    shuffleArray(products);

    // You could parameterize the number of products to return
    return products.slice(0, 4);
  } catch (error) {
    console.error("Fetching popular products failed:", error);
    return [];
  }
}
