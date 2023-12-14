import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRentals from './components/AddRentals';  // Adjust the import path as needed
import TransactionHistory from './components/TransactionHistory';  // Adjust the import path as needed
import { Navigate } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate replace to="/add-rentals" />} />
        <Route path="/add-rentals" element={<AddRentals />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        {/* Other routes can be added here */}
      </Routes>
    </Router>
  );
};

export default App;
