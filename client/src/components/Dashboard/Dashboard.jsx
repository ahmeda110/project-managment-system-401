import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";

import "../../assets/styles/Dashboard.css";
import "../../assets/styles/Modal.css";

function Dashboard({ activeTab, setActiveTab, initialTasks, activeSubTab, setActiveSubTab }) {


  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleStatusChange = (index) => {
    const newTasks = tasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, status: !task.status };
      }
      return task;
    });

    setTasks(newTasks);
  };

  const handleEditClick = (index) => {
    setEditingTask({ ...tasks[index], index });
    setIsModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask) => {
    if (isAddingTask) {
      // Handle adding a new task
      setTasks([...tasks, { ...updatedTask, status: false }]);
    } else {
      // Handle updating an existing task
      const newTasks = tasks.map((task, idx) =>
        idx === updatedTask.index ? { ...task, ...updatedTask } : task
      );
      setTasks(newTasks);
    }
    closeModal();
  };

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
    setIsAddingTask(true);
    setEditingTask({
      title: "",
      description: "",
      due: "",
      status: false,
      index: tasks.length,
    });
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setIsAddingTask(false); // Reset the adding task flag
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsSideMenuOpen(true);
  };

  // Sample useEffect for a POST request, uncomment if needed
  /*
    useEffect(() => {
        axios.post("http://localhost:3100/api/dashboard", {})
            .then(result => {
                console.log(result);
                // setDisplayTest(result.data); // Example of how to update state
            })
            .catch(err => console.error(err));
    }, []);
    */

  return (
    <>
      <div className="dashboard-container">
        <Sidebar
          className="sidebar-container"
          activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab}
        />
        <div className="content-container">
          <div className="content-header">
            <div className="title">All Tasks</div>
            <AiFillPlusCircle
              size={40}
              style={{ cursor: "pointer" }}
              onClick={handleAddTaskClick}
            />
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
                    <MdEditDocument
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
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          task={editingTask}
          onUpdate={handleTaskUpdate}
          onClose={closeModal}
          isAdding={isAddingTask}
        />
      )}
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
}

function Modal({ task, onUpdate, onClose, isAdding }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [due, setDue] = useState(task?.due || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, due, index: task?.index };
    onUpdate(taskData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">
            {isAdding ? "Add Task" : "Edit Task"}
          </span>
          <button onClick={onClose} className="close-button">
            <IoIosCloseCircle size={30} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="due">Due Date</label>
            <input
              id="due"
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
            />
          </div>

          <button type="submit" className="modal-submit-button">
            {isAdding ? "Add Task" : "Update Task"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="modal-cancel-button"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
