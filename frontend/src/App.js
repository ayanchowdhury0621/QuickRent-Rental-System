import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Authenticate from './components/Authenticate';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import BuyerDashboard from './components/BuyerDashboard';
import SearchPage from './components/SearchPage';

function App() {
  
  const [popularProducts, setPopularProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  

 


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
    <div>
      <Navbar productsData={popularProducts}/>
      <Router>
      <Routes>
        <Route path="/" element={<Authenticate />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard popularProducts={popularProducts}/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/seller-dashboard" element={<BuyerDashboard popularProducts={popularProducts}/>} />
      </Routes>
    </Router>
    
      {/* <Modal show={isModalOpen} onClose={handleCloseModal}>
        {selectedProduct && (
          <div>
            <h2>{selectedProduct.name}</h2>
            <p>Category: {selectedProduct.category}</p>
            <p>Price: ${selectedProduct.price}</p>
          </div>
        )}
      </Modal> */}

    </div>
  );
}

export default App;
