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

  // A function to safely handle the tags
  const formatTags = (tags) => {
    if (Array.isArray(tags)) {
      return tags.join(', ');
    } else if (tags) { // assuming it's a string or has a toString method
      return tags.toString();
    }
    return '';
  };

  return (
    <div>
      <h2>Transaction History</h2>
      <div className="transaction-list">
        {history.map((transaction, index) => (
          <div key={index} className="product">
            <img src={transaction.image} alt={transaction.name} />
            <div className="product-info">
              <h3>{transaction.name}</h3>
              <p>Tags: {formatTags(transaction.tags)}</p>
              <p className="price-tag">Price: ${transaction.price}</p>
              <p>Location Zip: {transaction.location}</p> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
