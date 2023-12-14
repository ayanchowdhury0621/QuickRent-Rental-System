import React from 'react';
import TransactionHistory from './components/TransacationHistory.js'; // Ensure this import path is correct
import './App.css';

const App = () => {
  return (
    <div>
      {/* Directly render the TransactionHistory component */}
      <TransactionHistory />
    </div>
  );
};

export default App;
