import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchComponent from './components/SearchComponent';
import './App.css';
import Modal from './components/Modal';
import Authenticate from './components/Authenticate';
import Cart from './components/Cart';

function App() {
  const [results, setResults] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // actCart = actual User cart
  // addToCart = post cart (product, quantity);
  const [actCart, addToCart] = Cart();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function getZipcodeFromCoordinates(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      return data.address.postcode;
    } catch (error) {
      console.error("Error in reverse geocoding:", error);
      return null; // or handle the error as appropriate
    }
  }

  // Function to handle adding product to cart
  const handleAddToCart = async (product) => {
    // Placeholder for add to cart logic
    // console.log('Add to cart:', product);
    await addToCart(product.id, 1);
  };

  // ProductCard component
  const ProductCard = ({ product }) => (
    <div className="product" onClick={() => handleProductClick(product)}>
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Zipcode: {product.location}</p>
        <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>Add to Cart</button>
      </div>
    </div>
  );

  const handleSearch = async (query) => {
    console.log("Search query:", query);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };

        try {
          // Get zipcode from coordinates
          const userZipcode = await getZipcodeFromCoordinates(userLocation.lat, userLocation.lon);
          if (userZipcode) {
            const response = await axios.post('http://localhost:5000/search', { query, location: userZipcode });
            console.log("Search response:", response.data);
            setResults(response.data.results);
          } else {
            console.error("Zipcode not found");
          }
        } catch (error) {
          console.error("Search failed:", error);
          if (error.response) {
            console.log(error.response);
          }
        }
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.log("Geolocation is not available");
    }
  };


  useEffect(() => {
    // Fetch popular rented products here and set them in the state
    const fetchPopularProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/popular-products');
        console.log("Popular products response:", response.data); // Log the response from the server
        setPopularProducts(response.data.products);
      } catch (error) {
        console.error("Fetching popular products failed:", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    // <div>
    //   <header className="App-header">
    //     <h1>Search For Rentals!</h1>
    //     <SearchComponent onSearch={handleSearch} />
    //   </header>
    //   <section className="popular-products">
    //     <h2>Popular Rented Products</h2>
    //     <div className="product-list">
    //       {popularProducts.map(product => (
    //         <ProductCard product={product} key={product.id} />
    //       ))}
    //     </div>
    //   </section>
    //   <section className="search-results">
    //     <h2>Search Results</h2>
    //     <div className="product-list">
    //       {results.map(product => (
    //         <ProductCard product={product} key={product.id} />
    //       ))}
    //     </div>
    //   </section>
    //   <Modal show={isModalOpen} onClose={handleCloseModal}>
    //     {selectedProduct && (
    //       <div>
    //         <h2>{selectedProduct.name}</h2>
    //         <p>Category: {selectedProduct.category}</p>
    //         <p>Price: ${selectedProduct.price}</p>
    //         <button onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
    //       </div>
    //     )}
    //   </Modal>
    //   <Authenticate />
    //   <Cart />
    // </div>
    <>
      <Authenticate />
    </>
  );
}

export default App;