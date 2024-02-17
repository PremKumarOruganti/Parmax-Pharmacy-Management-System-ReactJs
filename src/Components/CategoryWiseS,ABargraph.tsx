// BarChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

interface BarChartProps {
  salesData: {
    id: number;
    username: string;
    date: string;
    age: string;
    phone_number: number;
    Medicines: {
      medicine: string;
      quantity: number;
      amount_per_piece: number;
      category: string;
      totalAmount: number;
    }[];
    "No of medicines": number;
    "Total quantity": number;
    "Grand Total Amount": number;
  }[];
}

const BarChart: React.FC<BarChartProps> = ({ salesData }) => {
  // Flatten the array of medicines from all sales
  const allMedicines = salesData.flatMap((sale) =>
    sale.Medicines.map((medicine) => medicine.medicine)
  );

  // Count occurrences of each medicine
  const medicineCounts = allMedicines.reduce((counts, medicine) => {
    counts[medicine] = (counts[medicine] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  const labels = Object.keys(medicineCounts);
  const totalAmounts = labels.map((medicine) =>
    salesData.reduce((total, sale) => {
      const medicineSale = sale.Medicines.find(
        (med) => med.medicine === medicine
      );
      return total + (medicineSale ? medicineSale.totalAmount : 0);
    }, 0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Amount",
        data: totalAmounts,
        backgroundColor: ["red", "blue", "green"], // Customize colors as needed
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
