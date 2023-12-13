// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRentals from './components/AddRentals.js';
import TransactionHistory from './components/TransacationHistory.js'; // Import the new component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/add-rentals" element={<AddRentals />} />
        <Route path="/transaction-history" element={<TransactionHistory />} /> {/* Add this line */}
        {/* Your other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
