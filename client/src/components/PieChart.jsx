// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { color } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ isDark }) => {
  const data = {
    labels: ["Undiagnosed Dementia", "Diagnosed Dementia"],
    datasets: [
      {
        label: "Diagnosis Distribution",
        data: [60, 40], // Assuming 60% undiagnosed
        backgroundColor: ["#f87171", "#34d399"], // Red and green
        borderWidth: 5,
        hoverOffset: 18,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDark ? "#fff" : "#353333",
        },
      },
      title: {
        display: true,
        text: "60% of Annual Dementia Cases Go Undiagnosed",
        font: {
          size: 18,
        },
        color: isDark ? "#fff" : "#484545",
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div className="h-full w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
