import React, { useState, useEffect } from "react";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch data from JSON server
    fetch("http://localhost:5000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = async (id: any) => {
    try {
      console.log("Deleting transaction with ID:", id);

      const response = await fetch(`http://localhost:5000/transactions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // If deletion is successful, update the local state
        setTransactions((prevTransactions) =>
          prevTransactions.filter((transaction: any) => transaction.id !== id)
        );
        alert("Transaction deleted successfully");
      } else {
        alert("Failed to delete transaction");
        console.error("Failed to delete transaction:", response.statusText);
      }
    } catch (error) {
      alert("Error deleting transaction");
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Transaction Type</th>
            <th>Medicine Name</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: any) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.transactionType}</td>
              <td>{transaction.medicineName}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => handleDelete(transaction.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
