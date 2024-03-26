import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";

import "../../assets/styles/Dashboard.css";
import "../../assets/styles/Modal.css";
import TaskSideBar from "../Common/TaskSideBar";

function Dashboard({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const { id } = useParams();

  const getAllTasks = () => {
    axios
      .get("http://localhost:3100/api/tasks")
      .then((result) => {
        setInitialTasks(result.data);
        console.log(result.data);
      })
      .catch((err) => console.error(err));
  };

  const getTaskByProject = () => {
    axios
      .get(`http://localhost:3100/api/tasks/project/${id}`)
      .then((result) => {
        setInitialTasks(result.data);
        console.log(result.data);
      })
      .catch((err) => console.error(err));
  };

  const isNumber = !isNaN("2");

  const [initialTasks, setInitialTasks] = useState([]);
  useEffect(() => {
    if (!isNaN(id)) {
      getTaskByProject();
    } else {
      getAllTasks();
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState({
    title: "",
    description: "",
    due: "",
    status: false,
    priority: "", // New state variable for priority
    assignedTo: "", // New state variable for assigned to
  });
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleStatusChange = (index) => {
    const newTasks = initialTasks.map((task, idx) => {
      if (idx === index) {
        return { ...task, status: !task.status };
      }
      return task;
    });

    setInitialTasks(newTasks);
  };

  const handleEditClick = (index) => {
    setEditingTask({ ...initialTasks[index], index });
    setIsModalOpen(true);
  };

  const handleTaskUpdate = (updatedTask) => {
    if (isAddingTask) {
      // Handle adding a new task
      setInitialTasks([...initialTasks, { ...updatedTask, status: false }]);
    } else {
      // Handle updating an existing task
      const newTasks = initialTasks.map((task, idx) =>
        idx === updatedTask.index ? { ...task, ...updatedTask } : task
      );
      setInitialTasks(newTasks);
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
      priority: "", // Initialize priority
      assignedTo: "", // Initialize assigned to
      index: initialTasks.length,
    });
  };

  const handleDeleteTask = (index, id) => {
    const newTasks = initialTasks.filter((_, idx) => idx !== index);
    setInitialTasks(newTasks);

    axios
      .delete(`http://localhost:3100/api/tasks/${id}`)
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => console.error(err));
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

  const getMemberNameByID = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3100/api/members/${id}/name`);
      return response.data.name;
    } catch (error) {
      console.error(error);
      return "Unknown"; // Return a default value in case of error
    }
  }

  const AsyncComponent = ({ promise }) => {
    const [data, setData] = useState(null);
  
    useEffect(() => {
      promise.then((resolvedData) => {
        setData(resolvedData);
      });
    }, [promise]);
  
    return <>{data}</>;
  };

  return (
    <>
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
            <div className="title">All Tasks</div>
            <AiFillPlusCircle
              size={40}
              style={{ cursor: "pointer" }}
              onClick={handleAddTaskClick}
            />
          </div>
          <div className="tasks-container">
            {initialTasks &&
              initialTasks.map((task, index) => (
                <div
                  className="card"
                  key={index}
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="assignedTo-Title-div">
                    <div className="title">{task.name || task.title}</div>
                    <div className="assigned-to-container">
                      <div className="assigned-to">
                        <div className="dot"></div>
                        {task.assigned_to && (
  <AsyncComponent promise={getMemberNameByID(task.assigned_to)} />
)}
{task.assignedTo && (
  <AsyncComponent promise={getMemberNameByID(task.assignedTo)} />
)}
                      </div>
                    </div>
                  </div>

                  <div className="description">
                    <span style={{ color: "#7f7f7f" }}>{task.description}</span>
                  </div>
                  <div className="date">
                    <span style={{ fontWeight: "bold" }}>Due Date: </span>{" "}
                    {task.due_date || task.due}
                  </div>
                  {/* Display priority */}

                  {/* Display assigned to */}
                  <div className="card-action-section">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: ".5em",
                      }}
                    >
                      <div
                        className="status"
                        style={{
                          background: task.status ? "limegreen" : "red",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(index);
                        }}
                      >
                        {task.status ? "Completed" : "Incomplete"}
                      </div>
                      <div
                        className="status"
                        style={{
                          background: "#fbff00",
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        Priority - {task.priority}
                      </div>
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
                          handleDeleteTask(index, task.task_id);
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
      <div>
        {selectedTask && (
          <TaskSideBar
            tasks={[selectedTask]}
            setIsSideMenuOpen={setIsSideMenuOpen}
            isSideMenuOpen={isSideMenuOpen}
            title="Task Details"
          />
        )}
      </div>
    </>
  );
}

function Modal({ task, onUpdate, onClose, isAdding }) {
  console.log("task:", task);
  console.log("isAdding:", isAdding);
  const [title, setTitle] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");
  const [due, setDue] = useState(task?.due_date || "");
  const [priority, setPriority] = useState(task?.priority || ""); // State for priority
  const [assignedTo, setAssignedTo] = useState(task?.assigned_to || ""); // State for assigned to
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      due,
      priority,
      assignedTo,
      index: task?.index,
    };
    onUpdate(taskData);

    axios
      .post("http://localhost:3100/api/tasks", {
        name: title,
        description: description,
        due_date: due,
        status: status ? "TRUE" : "FALSE", // needed for supabase for some reason
        priority,
        assigned_to: assignedTo,
        project_id: id,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));
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
          <div>
            <label htmlFor="priority">Priority</label> {/* Priority dropdown */}
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Select Priority</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div>
            <label htmlFor="assignedTo">Assigned To</label>{" "}
            {/* Assigned to dropdown */}
            <select
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Select Assignee</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
              <option value="3">David Johnson</option>
            </select>
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
