import React, { useEffect, useState } from "react";
import Sidebar from "../SideBar/Sidebar";
import Chart from "chart.js/auto";
import "../../assets/styles/Home.css";
import axios from "axios";

function Home({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const [stats, setStats] = useState({});
  const [taskStatus, setTasksStatus] = useState({});
  const [tasksPerMonth, setTasksPerMonth] = useState({});

  const getStats = async () => {
    const stats = await axios.get(
      "http://localhost:3100/stats/project-task-member"
    );
    console.log("got stats", stats.data);
    setStats(stats.data);
  };

  const getTaskStatus = async () => {
    const taskStatus = await axios.get(
      "http://localhost:3100/stats/task-status"
    );
    console.log("got task status", taskStatus.data);
    setTasksStatus(taskStatus.data);
  };

  const getTasksPerMonth = async () => {
    const tasksPerMonth = await axios.get(
      "http://localhost:3100/tasks-per-month"
    );
    console.log("got tasks per month", tasksPerMonth.data);
    setTasksPerMonth(tasksPerMonth.data);
  };

  useEffect(() => {
    getStats();
    getTaskStatus();
    getTasksPerMonth();
  }, []);

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

    console.log("taskStatus", taskStatus);

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed Tasks", "Uncompleted Tasks"],
        datasets: [
          {
            label: "Tasks Overview",
            data: [
              taskStatus?.completedTasks ?? 1,
              taskStatus?.uncompletedTasks ?? 1,
            ],
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

    // console.log(
    //   "tasksPerMonth keys:",
    //   Object.keys(tasksPerMonth).reverse(),
    //   "values:",
    //   Object.values(tasksPerMonth).reverse()
    // );

    new Chart(ctx, {
      type: "line",
      data: {
        labels: tasksPerMonth ? Object.keys(tasksPerMonth).reverse() : [],
        datasets: [
          {
            label: "Tasks Over Time",
            data: tasksPerMonth ? Object.values(tasksPerMonth).reverse() : [],
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

  useEffect(() => {
    createLineChart();
  }, [tasksPerMonth]);

  useEffect(() => {
    createDoughnutChart();
  }, [taskStatus]);

  return (
    <div className="dashboard-container">
      <Sidebar
        className="sidebar-container"
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        setActiveTab={setActiveTab}
        setActiveSubTab={setActiveSubTab}
      />
      <div className="content-container" style={{ overflowY: "auto" }}>
        <div className="content-header">
          <div className="title">Home</div>
        </div>
        <div className="statistics">
          <div className="statistic">
            <div className="value">
              {taskStatus?.completedTasks ?? "loading"}
            </div>
            <div className="label">Tasks Completed</div>
          </div>
          <div className="statistic">
            <div className="value">
              {taskStatus?.uncompletedTasks ?? "loading"}
            </div>
            <div className="label">Tasks Uncompleted</div>
          </div>
          <div className="statistic">
            <div className="value">{stats?.totalTasks ?? "loading"}</div>
            <div className="label">Total Tasks</div>
          </div>
          <div className="statistic">
            <div className="value">{stats?.totalProjects ?? "loading"}</div>
            <div className="label">Total Projects</div>
          </div>
        </div>
        <div className="visuals-container">
          <div className="donught-container">
            <canvas id="doughnutChart" width="400" height="200"></canvas>
          </div>
          <div className="chart-container">
            <canvas id="lineChart" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
