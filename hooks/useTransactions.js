//react custom hook file
import { API_URL } from "../constants/api.js";
import { useCallback, useState } from "react";

import { Alert } from "react-native";

//const API_URL = "https://wallet-api-y35r.onrender.com/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log("Error fetching transactions", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.log("Error fetching summary", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);

    try {
      //can use Promise.all to fetch both transactions and summary concurrently
      //can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.log("Error loading data", error);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/transactions/${id}, {method: "DELETE"}`
      );
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      // Refresh data after deletion
      loadData();

      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.log("Error deleting transaction", error);
      Alert.alert("Error", error.message);
    }
  };

  return { transactions, summary, loading, loadData, deleteTransaction };
};
