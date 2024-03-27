import React, { useState } from "react";
import axios from "axios";

import Sidebar from "../SideBar/Sidebar";

import "../../assets/styles/Calendar.css";
import { useEffect } from "react";
import TaskSideBar from "../Common/TaskSideBar";

const Calendar = ({
  activeTab,
  setActiveTab,
  activeSubTab,
  setActiveSubTab,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [taskSidebarOpen, setTaskSidebarOpen] = useState(false);

  const handleTaskClick = (task) => {
    //setSelectedTask(task);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3100/api/tasks")
      .then((result) => {
        setTasks(result.data);
        console.log(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const generateCalendarGrid = () => {
    const grid = [];
    const currentDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();
  
    const firstDayOfWeek = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    ).getDay();
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      const tasksForDay = tasks.filter((task) => {
        const taskDate = new Date(task.due_date);
        return (
          taskDate.getDate() === i &&
          taskDate.getMonth() === selectedDate.getMonth() &&
          taskDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      grid.push({ date, number: i, tasks: tasksForDay });
    }
  
    return grid;
  };  

  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };

  const onDayClicked = (day) => {
    setSelectedTasks(day.tasks);
    setTaskSidebarOpen(day.tasks.length > 0);
  };

  return (
    <>
      <div className="calendar-container">
        <Sidebar
          className="sidebar-container"
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          setActiveTab={setActiveTab}
          setActiveSubTab={setActiveSubTab}
        />

        <div className="content-calendar-container">
          <div className="calendar-header">
            <div>
              <h2 style={{ fontSize: "27.5px" }}>
                {selectedDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
            </div>
            <div style={{ display: "flex", columnGap: ".5em" }}>
              <button onClick={prevMonth}>Previous</button>
              <button onClick={nextMonth}>Next</button>
            </div>
          </div>
          <div className="calendar-grid">
            {generateCalendarGrid().map((day) => (
              <div
                key={day.date}
                className="calendar-day"
                onClick={() => onDayClicked(day)}
                style={{ cursor: day.tasks.length > 0 ? "pointer" : "default" }}
              >
                <div
                  className="day-number"
                  style={
                    day.tasks.length
                      ? { fontWeight: "bold", color: "white" }
                      : {}
                  }
                >
                  {day.number}
                </div>

                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="task-bar"
                    //onClick={() => handleTaskClick(task)}
                  >
                    {task.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {taskSidebarOpen && (
        <TaskSideBar
          tasks={selectedTasks}
          setIsSideMenuOpen={(isOpen) => setTaskSidebarOpen(isOpen)}
          isSideMenuOpen={taskSidebarOpen}
          title="Daily Tasks"
        />
      )}
    </>
  );
};

export default Calendar;
