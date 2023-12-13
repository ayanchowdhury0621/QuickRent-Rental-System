// components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import { fetchTransactionHistory } from '../logic/fetchTransactionHistory';

const TransactionHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchAndSetHistory = async () => {
      const transactions = await fetchTransactionHistory();
      setHistory(transactions);
    };

    fetchAndSetHistory();
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <div className="transaction-list">
        {history.map((transaction, index) => (
          <div key={index}>
            {/* Display transaction details here */}
            <p>{transaction.name}</p>
            <p>{transaction.tags}</p>
            <p>{transaction.price}</p>
            <p>{transaction.location}</p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
