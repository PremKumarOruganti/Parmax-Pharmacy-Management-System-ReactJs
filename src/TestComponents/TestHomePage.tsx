import React from "react";
import { useState, useEffect } from "react";

const TestHomePage = () => {
  const [stockdata, setStockData] = useState([]);
  const apiUrl = "http://localhost:5000";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl + "/" + "saleInvoices");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setStockData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("stockdata", stockdata);
  let totalGrandAmount = 0;
  let totalQuantity = 0;

  // Iterate through each sale invoice
  stockdata.forEach((invoice) => {
    // Add Grand Total Amount to the totalGrandAmount variable
    totalGrandAmount += invoice["Grand Total Amount"];

    // Add Total quantity to the totalQuantity variable
    totalQuantity += invoice["Total quantity"];
  });

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-6">{totalQuantity}</div>|
            <div className="col-md-6">{totalGrandAmount}</div>
          </div>
        </div>
        <div className="col-md-8">ReportPart</div>
      </div>
    </>
  );
};

export default TestHomePage;
