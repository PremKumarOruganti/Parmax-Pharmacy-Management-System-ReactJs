import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { CoreChartOptions, PluginOptionsByType } from "chart.js";
import { useState, useEffect } from "react";
import "chart.js/auto";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import BarGragraphForCategory from "./BarGragraphForCategory";
import HighestSalesBarGraph from "./Graphs/HighestSalesBarGraph";
import HighestSalesDonutChart from "./Graphs/HighestSalesDoughnutChart";
//import Chart from "chart.js";

interface Invoice {
  uNo: string;
  nameOfParty: string;
  age: string;
  mobile: string;
  email: string;
  address: string;
  transactionType: string;
  totalQuantity: number;
  totalAllAmounts: number;
  date: string;
  invoiceNum: string;
  id: number;
}

const StackDetailsGraph: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);
  const [salesData, setSalesData] = useState<Invoice[]>([]);
  const [purchaseData, setPurchaseData] = useState<Invoice[]>([]);
  const [medicineLabels, setMedicineLabels] = useState<string[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalQuantityPur, setTotalQuantityPur] = useState<number>(0);
  const [totalAmountPur, setTotalAmountPur] = useState<number>(0);
  ///pie
  const [medicineCategory, setMedicineCategory] = useState<any[]>([]);
  const [transactionPurchase, setTransactionsPurchae] = useState<any[]>([]);
  const [transactionSales, setTransactionSales] = useState<any[]>([]);

  async function fetchData() {
    try {
      // Fetch data from your API
      const response = await axios.get<Invoice[]>(
        "http://localhost:5000/invoices"
      );
      // Assuming your API response has a "data" property with the required structure
      setInvoiceData(response.data);

      // Filter data based on transaction type
      const salesData = response.data.filter(
        (item) => item.transactionType === "Sales"
      );
      const purchaseData = response.data.filter(
        (item) => item.transactionType === "Purchase"
      );
      const totalQuantity = salesData.reduce(
        (acc, item) => acc + item.totalQuantity,
        0
      );
      const totalAmount = salesData.reduce(
        (acc, item) => acc + item.totalAllAmounts,
        0
      );

      const totalQuantity1 = purchaseData.reduce(
        (acc, item) => acc + item.totalQuantity,
        0
      );
      const totalAmount1 = purchaseData.reduce(
        (acc, item) => acc + item.totalAllAmounts,
        0
      );
      setTotalQuantityPur(totalQuantity1);
      setTotalAmountPur(totalAmount1);
      setTotalQuantity(totalQuantity);
      setTotalAmount(totalAmount);

      // Set the filtered data to state variables
      setSalesData(salesData);
      setPurchaseData(purchaseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("totalQuantitpur", totalQuantityPur);
  console.log("totalAmount2", totalAmount);
  console.log("salesData2", salesData);
  console.log("purchaseData", purchaseData);

  let categories: any[] = ["Purchased", "Sold", "Remaining"];
  let quantity1: any[] = [
    totalQuantityPur,
    totalQuantity,
    totalQuantityPur - totalQuantity,
  ];
  let amount1: any[] = [
    totalAmountPur,
    totalAmount,
    totalAmountPur - totalAmount,
  ];

  //   const { categories, quantity, amount } = data;

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Total Purchase Medicines",
        backgroundColor: "rgba(255, 255, 0, 0.4)", // Yellow
        borderColor: "rgba(255, 255, 0, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 255, 0, 0.6)",
        hoverBorderColor: "rgba(255, 255, 0, 1)",
        data: quantity1,
        //yAxisID: "quantity", // Specify the y-axis for quantity
      },
      {
        label: "Total Purchase Amount",
        backgroundColor: "rgba(0, 255, 0, 0.4)", // Green
        borderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0, 255, 0, 0.6)",
        hoverBorderColor: "rgba(0, 255, 0, 1)",
        data: amount1,
        //yAxisID: "amount", // Specify the y-axis for amount
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        beginAtZero: true,
        stacked: true,
      },
    },
  };
  /////// Pie Chart ///
  async function fetchManageCategory() {
    try {
      // Fetch data from your API
      const response = await axios.get<any[]>(
        "http://localhost:5000/manageCategories"
      );

      let manageCategory = response.data.filter(
        (item: any) => item.status == "Active"
      );
      setMedicineCategory(manageCategory);
      console.log("manageMedicines4", manageCategory);

      setSalesData(salesData);
      setPurchaseData(purchaseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  //
  async function fetchTransactions() {
    try {
      // Fetch data from your API
      const response = await axios.get<any[]>(
        "http://localhost:5000/transactions"
      );

      let transactionP = response.data.filter(
        (item: any) => item.transactionType == "Purchase"
      );
      setTransactionsPurchae(transactionP);
      console.log("transactionPurchase", transactionP);
      ///

      let transactionS = response.data.filter(
        (item: any) => item.transactionType == "Sales"
      );
      setTransactionSales(transactionS);
      console.log("transactionPurchase", transactionS);

      //setSalesData(salesData);
      //setPurchaseData(purchaseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchManageCategory();
    fetchTransactions();
  }, []);

  // Calculate remaining quantity for each medicine
  const calculateRemainingQuantity = () => {
    const remainingQuantities: any = {};

    // Calculate total purchase quantity
    transactionPurchase.forEach((purchase: any) => {
      const medicineName = purchase.medicineName;
      remainingQuantities[medicineName] =
        (remainingQuantities[medicineName] || 0) + parseInt(purchase.quantity);
    });

    // Subtract total sales quantity
    transactionSales.forEach((sale: any) => {
      const medicineName = sale.medicineName;
      remainingQuantities[medicineName] =
        (remainingQuantities[medicineName] || 0) - parseInt(sale.quantity);
    });

    return remainingQuantities;
  };

  // Example usage
  const remainingQuantities = calculateRemainingQuantity();
  console.log("Remaining Quantities:", remainingQuantities);

  const medicineNames = Object.keys(remainingQuantities);

  const remainingQuantitiesValues = Object.values(remainingQuantities);

  console.log("medicineCategory", medicineCategory);

  const data = {
    labels: medicineNames,

    // labels: ["covid care", "Dermo care", "Baby Care", "Skin Care"],
    datasets: [
      {
        data: remainingQuantitiesValues,
        backgroundColor: [
          "#b91d47",
          "#00aba9",
          "#2b5797",
          "#e8c3b9",
          "#1e7145",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top" as "top", // specify the position type
      },
      title: {
        display: true,
        text: "Stock Present In The PharmX",
      },
    },
  };

  /////// Pie Chart ///

  /// Bar Graph ///
  // Initial static data for the top-level categories
  const [chartBarGraphData, setChartBarGraphData] = useState<any>({
    labels: [],
    datasets: [],
  });

  // Initial static data for the top-level categories
  const initialData = {
    labels: ["Category 1", "Category 2", "Category 3"],
    datasets: [
      {
        label: "Top Level Categories",
        data: [30, 50, 20],
        backgroundColor: ["#b91d47", "#00aba9", "#2b5797"],
      },
    ],
  };

  // Drill-down data for subcategories
  const subcategoryData1 = {
    labels: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
    datasets: [
      {
        label: "Subcategories",
        data: [15, 25, 10],
        backgroundColor: ["#b91d47", "#00aba9", "#2b5797"],
      },
    ],
  };

  const subcategoryData2 = {
    labels: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
    datasets: [
      {
        label: "Subcategories",
        data: [10, 30, 15],
        backgroundColor: ["#b91d47", "#00aba9", "#2b5797"],
      },
    ],
  };

  const subcategoryData3 = {
    labels: ["Subcategory 1", "Subcategory 2", "Subcategory 3"],
    datasets: [
      {
        label: "Subcategories",
        data: [20, 15, 25],
        backgroundColor: ["#b91d47", "#00aba9", "#2b5797"],
      },
    ],
  };

  useEffect(() => {
    setChartBarGraphData(initialData);
  }, []);

  const handleBarClick = (elems: any) => {
    if (elems.length > 0) {
      // User clicked on a bar
      const clickedBarIndex = elems[0].index;

      // Check which bar is clicked and set data accordingly
      if (clickedBarIndex === 0) {
        setChartBarGraphData(subcategoryData1);
      } else if (clickedBarIndex === 1) {
        setChartBarGraphData(subcategoryData2);
      } else if (clickedBarIndex === 2) {
        setChartBarGraphData(subcategoryData3);
      }
    }
  };

  const barGraphOptions = {
    onClick: handleBarClick,
    plugins: {
      legend: {
        display: true,
        position: "top" as "top",
      },
      title: {
        display: true,
        text: "Drill Down Bar Graph",
      },
    },
  };

  /// Bar Graph ///

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3}>
            <div className="mx-auto text-center">
              <h2>Purchase Details</h2>
              <Bar
                data={chartData}
                options={chartOptions}
                width={600}
                height={300}
              />
            </div>
          </Col>
          <Col md={3} className="text-center">
            <div
              style={{ width: "300px", height: "300px" }}
              className="mx-auto text-center"
            >
              <Pie data={data} options={options} width={300} height={400} />
            </div>
          </Col>
          <Col md={6}>
            {/* <Bar data={chartBarGraphData} options={barGraphOptions} /> */}
            <BarGragraphForCategory />
          </Col>
        </Row>
        <Row>
          <Col md={9}>
            <HighestSalesBarGraph />
          </Col>
          <Col md={3}>
            <HighestSalesDonutChart />
          </Col>
        </Row>
      </Container>
      <Container></Container>
    </>
  );
};

export default StackDetailsGraph;
