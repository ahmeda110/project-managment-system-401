import React, { useState, useEffect } from "react";
import Sidebar from "../SideBar/Sidebar";
import { IoIosCloseCircle } from "react-icons/io";

const Tasks = ({ activeTab, setActiveTab }) => {
  const initialTasks = [
    {
      title: "Dentist Appointment",
      description: "Schedule a 6-month check-up with the dentist",
      due: "2025-10-25",
      status: true,
    },
    {
      title: "Grocery Shopping",
      description: "Buy groceries for the week",
      due: "2025-10-26",
      status: false,
    },
    {
      title: "Car Service",
      description: "Take the car for its annual service",
      due: "2025-11-01",
      status: true,
    },
    {
      title: "Book Club",
      description: "Prepare for the next book club meeting",
      due: "2025-11-05",
      status: false,
    },
    {
      title: "Renew Gym Membership",
      description: "Renew the annual gym membership",
      due: "2025-11-10",
      status: true,
    },
  ];
  const [tasks, setTasks] = useState(initialTasks);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsSideMenuOpen(true);
  };

  const handleStatusChange = (index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, status: !task.status };
      }
      return task;
    });

    setTasks(newTasks);
  };

  return (
    <>
      <div className="dashboard-container">
        <Sidebar
          className="sidebar-container"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="content-container">
          <div className="content-header">
            <div className="title">My Tasks</div>
          </div>
          <div className="tasks-container">
            {tasks.map((task, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleTaskClick(task)}
              >
                <div className="title">{task.title}</div>
                <div className="description">{task.description}</div>
                <div className="date">{task.due}</div>
                <div className="card-action-section">
                  <div
                    className="status"
                    style={{ background: task.status ? "limegreen" : "red" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(index);
                    }}
                  >
                    {task.status ? "Completed" : "Incomplete"}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      columnGap: ".5em",
                      cursor: "pointer",
                    }}
                  >
                    {/* <MdEditDocument
                      size={26}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(index);
                      }}
                    />
                    <RiDeleteBin2Fill
                      size={26}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(index);
                      }}
                    /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`side-menu ${isSideMenuOpen ? "open" : ""}`}>
        {selectedTask && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>{selectedTask.title}</h2>
              <IoIosCloseCircle
                size={30}
                onClick={() => setIsSideMenuOpen(false)}
                style={{ cursor: "pointer" }}
              />
            </div>

            <p>Description: {selectedTask.description}</p>
            <p>Due: {selectedTask.due}</p>
            <p>Status: {selectedTask.status ? "Completed" : "Incomplete"}</p>
          </>
        )}
      </div>
    </>
  );
};

export default Tasks;
