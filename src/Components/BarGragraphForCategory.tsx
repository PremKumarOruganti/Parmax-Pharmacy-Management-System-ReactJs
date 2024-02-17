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

const BarGraphForCategory: React.FC = () => {
  const [graphData, setGraphData] = useState<any>({
    chart: {
      type: "column",
    },
    title: {
      text: "Medicine Sales by Category",
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
    fetch("http://localhost:5000/manageCategories")
      .then((response) => response.json())
      .then((apiData) => {
        const categories = apiData.map(
          (category: any) => category.categoryName
        );

        console.log("Categories from API:", categories);
        const medi = ["covid care3", "Dermo care6", "Baby Care8", "Skin Care8"];
        fetch("http://localhost:5000/manageMedicines")
          .then((response) => response.json())
          .then((manageMedicine) => {
            const mM = manageMedicine.map((item: any) => item.medicineName);
            setmMM(mM);
            console.log("Medicines from API:", manageMedicine);

            const drilldownSeries: Highcharts.SeriesColumnOptions[] =
              categories.map(
                (category: any): Highcharts.SeriesColumnOptions => {
                  const medicines = manageMedicine.filter(
                    (medicine: any) => medicine.selectCategory === category
                  );

                  // Skip categories with no data
                  if (medicines.length === 0) {
                    return {
                      type: "column",
                      id: category,
                      name: category,
                      data: [], // Empty data array
                    };
                  }

                  return {
                    type: "column",
                    id: category,
                    name: category,
                    data: medicines.map((medicine: any) => [
                      medicine.medicineName,
                      parseInt(medicine.price),
                    ]),
                  };
                }
              );

            console.log("Drilldown Series1:", drilldownSeries);
            console.log("categorieswee", categories);
            setGraphData({
              ...graphData,
              xAxis: {
                type: "category",
              },
              series: [
                {
                  name: "Categories",
                  colorByPoint: true,
                  data: categories.map((category: any) => ({
                    name: category,
                    y: 10,
                    drilldown: category,
                  })) as Highcharts.PointOptionsObject[],
                },
              ],
              drilldown: {
                series: drilldownSeries,
              },
            });

            setLoading(false);
          })
          .catch((error) => console.error("Error fetching medicines:", error));
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

export default BarGraphForCategory;
