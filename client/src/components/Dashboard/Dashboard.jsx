import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { CiLink } from "react-icons/ci";

import "../../assets/styles/Dashboard.css";
import "../../assets/styles/Modal.css";
import TaskSideBar from "../Common/TaskSideBar";

function Dashboard({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const getAllTasks = () => {
    axios
      .get("http://localhost:3100/api/tasks")
      .then((result) => {
        setInitialTasks(result.data);
      })
      .catch((err) => console.error(err));
      setProjectName("");
  };

  const getTaskByProject = () => {
    axios
      .get(`http://localhost:3100/api/tasks/project/${id}`)
      .then((result) => {
        setInitialTasks(result.data);
      })
      .catch((err) => console.error(err));
  };

  const getprojectName = (id, setName) => {
    axios
    .get(`http://localhost:3100/api/project/name/${id}`)
    .then((result) => {
      console.log(result.data)
      if(setName) {
        setProjectName(result.data + ": ");
      }
      return result.data
    })
    .catch((err) => console.error(err));
  }

  const [projectName, setProjectName] = useState("")
  const [initialTasks, setInitialTasks] = useState([]);
  useEffect(() => {
    if (!isNaN(id)) {
      getTaskByProject();
      getprojectName(id, true);
    } else {
      getAllTasks();
    }
  }, [id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState({
    title: "",
    description: "",
    due: "",
    status: false,
    priority: "",
    assignedTo: "",
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
      setInitialTasks([...initialTasks, { ...updatedTask, status: false }]);
    } else {
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
      priority: "",
      assignedTo: "",
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
    setIsAddingTask(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsSideMenuOpen(true);
  };

  const getMemberNamesForTasks = async () => {
    const updatedTasks = [];
    for (let i = 0; i < initialTasks.length; i++) {
      const task = initialTasks[i];
      const assignedToName = await getMemberNameByID(task.assigned_to);
      const assignedToNameAlt = await getMemberNameByID(task.assignedTo);
      const projectName = await getProjectName(task.project_id);
      updatedTasks.push({ ...task, projectName, assignedToName, assignedToNameAlt });
    }
    setInitialTasks(updatedTasks);
    console.log(updatedTasks)
  };

  
  useEffect(() => {
    if (initialTasks.length > 0) {
      getMemberNamesForTasks();
    }
  }, [id, initialTasks.length]);
  
  const getMemberNameByID = async (id) => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:3100/api/members/${id}/name`);
        return response.data.name;
      }
      return "Unknown";
    } catch (error) {
      console.error(error);
      return "Unknown";
    }
  };

  const getProjectName = async (id) => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:3100/api/project/name/${id}`);
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return "Unknown";
    }
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
            <div className="title">{projectName}All Tasks</div>
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
                  <div 
                    style={{ display: "flex", alignitems: "center", columnGap: "5px", fontSize: "13px", marginBottom: "1em"}}
                    onClick={(e) => { e.stopPropagation(); navigate(`/tasks/${task.project_id}`)}}
                    >
                  <CiLink size={22}/>
                  {task.projectName}
                  </div>
                  <div className="assignedTo-Title-div">
                    
                    <div className="title">{task.name || task.title}</div>
                    <div className="assigned-to-container">
                      <div className="assigned-to">
                        <div className="dot"></div>
                        <span>{task.assignedToName || task.assignedToNameAlt || "loading"}</span>
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
        status: status ? "TRUE" : "FALSE", // Where is `status` defined?
        priority,
        assigned_to: assignedTo,
        project_id: id,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));
  };

  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/members`)
      .then((result) => {
        console.log(result.data)
        setAllUsers(result.data);
      })
      .catch((err) => console.error(err));
  }, [allUsers])

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
              {allUsers && allUsers.map((val) => (
                <option value={val.member_id}>{val.name}</option>
              ))}
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
