import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";


import "../../assets/styles/Dashboard.css";
import "../../assets/styles/Modal.css"

function Dashboard() {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  

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
    const newTasks = tasks.map((task, idx) =>
        idx === updatedTask.index ? { ...task, ...updatedTask } : task
    );
    setTasks(newTasks);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
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
        <Sidebar className="sidebar-container" />
        <div className="content-container">
          <div className="content-header">
            <div className="title">All Tasks</div>
            <AiFillPlusCircle size={40} style={{ cursor: "pointer" }} />
          </div>
          <div className="tasks-container">
            {tasks.map((task, index) => (
              <div className="card" key={index}>
                <div className="title">{task.title}</div>
                <div className="description">{task.description}</div>
                <div className="date">{task.due}</div>
                <div className="card-action-section">
                  <div
                    className="status"
                    style={{ background: task.status ? "limegreen" : "red" }}
                    onClick={() => handleStatusChange(index)}
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
                    <MdEditDocument size={26} onClick={() => handleEditClick(index)}/>
                    <RiDeleteBin2Fill size={26} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && <Modal task={editingTask} onUpdate={handleTaskUpdate} onClose={closeModal} />}
    </>
  );
}

function Modal({ task, onUpdate, onClose }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [due, setDue] = useState(task.due);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...task, title, description, due });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <span className="modal-title">Edit Task</span>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
                    <button type="submit">Update Task</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default Dashboard;