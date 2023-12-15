import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import PopularProducts from './PopularProducts';
import axios from 'axios';
import SearchComponent from './SearchComponent';

const SearchPage = () => {

    const [results, setResults] = useState([]);

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

  return (
    <div>
        <section className="search-results">
        <h2>Search Results</h2>
        <SearchComponent onSearch={handleSearch} /> 
        {
            results && 
                <PopularProducts popularProducts={results} />        

        }
      </section>
    </div>
  )
}

export default SearchPage