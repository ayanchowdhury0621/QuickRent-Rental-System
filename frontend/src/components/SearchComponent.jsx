import React, { useState } from 'react';
import styles from './SearchComponent.scss'; // Corrected import statement

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
        className="search-bar form-label mt-2 rounded-5 p-1 ps-2"
        placeholder="Search"
      />
      {/* <i class="fas fa-search"></i> */}
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
}


export default SearchComponent;
