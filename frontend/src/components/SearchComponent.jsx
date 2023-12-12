import React, { useState } from 'react';
import './SearchComponent.css'; // Corrected import statement

function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  // Handle the Enter key press event
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress} // Add this line
        className="search-bar"
        placeholder="Search for items..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}


export default SearchComponent;
