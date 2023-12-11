import React, { useState } from 'react';
import axios from 'axios';
import SearchComponent from './components/SearchComponent';

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    console.log("Search query:", query); // Log the search query

    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        };

        try {
          const response = await axios.post('http://localhost:5000/search', { query, location: userLocation });
          console.log("Search response:", response.data); // Log the response from the server
          setResults(response.data.results);
        } catch (error) {
          console.error("Search failed:", error);
          console.log(error.response); // Log the error response if available
        }
      }, (error) => {
        console.error("Error getting location:", error);
      });
    } else {
      console.log("Geolocation is not available");
      // Handle the case where geolocation is not available
    }
  };

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <div>
        {results.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
