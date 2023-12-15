// logic/fetchTransactionHistory.js
import axios from "axios";

export async function fetchTransactionHistory() {
  try {
    const response = await axios.get(
      "http://localhost:5008/transaction-history"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return [];
  }
}
