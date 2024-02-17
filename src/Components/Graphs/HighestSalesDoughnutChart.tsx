import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

(function (H: any) {
  H.seriesTypes.pie.prototype.animate = function (init: any) {
    const series = this,
      chart = series.chart,
      points = series.points,
      { animation } = series.options,
      { startAngleRad } = series;

    function fanAnimate(point: any, startAngleRad: any) {
      const graphic = point && point.graphic, // Check if point is defined
        args = point && point.shapeArgs; // Check if point is defined

      if (graphic && args) {
        graphic
          .attr({
            start: startAngleRad,
            end: startAngleRad,
            opacity: 1,
          })
          .animate(
            {
              start: args.start,
              end: args.end,
            },
            {
              duration: animation.duration / points.length,
            },
            function () {
              if (points[point.index + 1]) {
                fanAnimate(points[point.index + 1], args.end);
              }
              if (point.index === series.points.length - 1) {
                series.dataLabelsGroup.animate(
                  {
                    opacity: 1,
                  },
                  void 0,
                  function () {
                    points.forEach((point: any) => {
                      point.opacity = 1;
                    });
                    series.update(
                      {
                        enableMouseTracking: true,
                      },
                      false
                    );
                    chart.update({
                      plotOptions: {
                        pie: {
                          innerSize: "40%",
                          borderRadius: 8,
                        },
                      },
                    });
                  }
                );
              }
            }
          );
      }
    }

    if (init) {
      points.forEach((point: any) => {
        point.opacity = 0;
      });
    } else {
      fanAnimate(points[0], startAngleRad);
    }
  };
})(Highcharts);

const CustomAnimatedPieChart: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "pie",
    },
    title: {
      text: "Highest selling medicines",
      align: "left",
    },
    subtitle: {
      text: "Custom animation of pie series",
      align: "left",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        borderWidth: 2,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b><br>{point.percentage}%",
          distance: 20,
        },
      },
    },
    series: [
      {
        enableMouseTracking: false,
        animation: {
          duration: 2000,
        },
        colorByPoint: true,
        data: [], // Leave it empty initially
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/transactions");
        const apiData = await response.json();

        const groupedMedicines = apiData.reduce((acc: any, medicine: any) => {
          const existingMedicine = acc.find(
            (m: any) => m.name === medicine.medicineName
          );

          if (existingMedicine) {
            existingMedicine.y += parseInt(medicine.quantity, 10);
          } else {
            acc.push({
              name: medicine.medicineName,
              y: parseInt(medicine.quantity, 10),
            });
          }
          console.log("existingMedicine", existingMedicine);
          return acc;
        }, []);

        setChartOptions({
          ...chartOptions,
          series: [
            {
              enableMouseTracking: false,
              animation: {
                duration: 2000,
              },
              colorByPoint: true,
              data: groupedMedicines,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default CustomAnimatedPieChart;
