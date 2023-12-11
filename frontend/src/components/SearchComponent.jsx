import React, { useState } from 'react';

function SearchComponent({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      console.log("Initiating search for:", query); // Log when a search is initiated
      onSearch(query);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchComponent;
