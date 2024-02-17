import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
drilldown(Highcharts);

interface Medicine {
  id: number;
  selectCategory: string;
  description: string;
  price: string;
  selectStatus: string;
  medicineName: string;
}

interface Category {
  id: number;
  categoryName: string;
  status: string;
}

const HighestSalesBarGraph: React.FC = () => {
  const [graphData, setGraphData] = useState<any>({
    chart: {
      type: "column",
    },
    title: {
      text: "Highest selling medicines",
    },
    xAxis: {
      categories: [], // Initialize with empty categories
    },
    yAxis: {
      title: {
        text: "Total Sales",
      },
    },
    series: [
      {
        name: "Categories",
        colorByPoint: true,
        data: [],
      },
    ],
    drilldown: {
      series: [],
    },
  });

  const [loading, setLoading] = useState(true);
  const [mMM, setmMM] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/transactions")
      .then((response) => response.json())
      .then((apiData) => {
        const Medicines = apiData.map((medicone: any) => medicone);

        console.log("Medicines from API:", Medicines);
        const medi = ["covid care3", "Dermo care6", "Baby Care8", "Skin Care8"];

        setGraphData({
          ...graphData,
          xAxis: {
            type: "category",
          },
          series: [
            {
              name: "Total Amount",
              colorByPoint: true,
              data: Medicines.map((medicine: any) => ({
                name: medicine.medicineName,
                y: Medicines.reduce(
                  (acc: any) => acc + parseInt(medicine.quantity),
                  0
                ),

                drilldown: medicine,
              })) as Highcharts.PointOptionsObject[],
            },
          ],
        });

        setLoading(false);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []); // Make sure to include all dependencies that are used inside the useEffect

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={graphData} />
      )}
    </div>
  );
};

export default HighestSalesBarGraph;
