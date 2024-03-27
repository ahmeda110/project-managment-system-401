import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Chart from "chart.js/auto";
import "../../assets/styles/Home.css";

function Home({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const tasksCompleted = 80;
  const tasksUncompleted = 20;
  const totalTasks = tasksCompleted + tasksUncompleted;
  const totalProjects = 5;

  const createCharts = () => {
    createDoughnutChart();
    createLineChart();
  };

  const createDoughnutChart = () => {
    const ctx = document.getElementById("doughnutChart");

    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed Tasks", "Uncompleted Tasks"],
        datasets: [
          {
            label: "Tasks Overview",
            data: [tasksCompleted, tasksUncompleted],
            backgroundColor: ["#36A2EB", "#FF6384"],
            borderWidth: 0,
          },
        ],
      },
    });
  };

  const createLineChart = () => {
    const ctx = document.getElementById("lineChart");

    const existingChart = Chart.getChart(ctx);

    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Tasks Over Time",
            data: [20, 30, 40, 50, 60, 70],
            borderColor: "#4CAF50",
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  React.useEffect(() => {
    createCharts();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar
        className="sidebar-container"
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
      />
      <div className="content-container">
        <div className="content-header">
          <div className="title">Home</div>
        </div>
        <div className="statistics">
          <div className="statistic">
            <div className="value">{tasksCompleted}</div>
            <div className="label">Tasks Completed</div>
          </div>
          <div className="statistic">
            <div className="value">{tasksUncompleted}</div>
            <div className="label">Tasks Uncompleted</div>
          </div>
          <div className="statistic">
            <div className="value">{totalTasks}</div>
            <div className="label">Total Tasks</div>
          </div>
          <div className="statistic">
            <div className="value">{totalProjects}</div>
            <div className="label">Total Projects</div>
          </div>
        </div>
        <div className="visuals-container">
          <div
            className="donught-container"
    
          >
            <canvas id="doughnutChart" width="400" height="200"></canvas>
          </div>
          <div
            className="chart-container"

          >
            <canvas id="lineChart" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
