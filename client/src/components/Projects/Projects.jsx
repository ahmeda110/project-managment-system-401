import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiHome2Fill } from "react-icons/ri";
import Dashboard from "../Dashboard/Dashboard";

import "../../assets/styles/Dashboard.css";
import "../../assets/styles/Modal.css";

const Projects = ({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) => {
  const [projectClicked, setProjectClicked] = useState(false);

  const intialProjects = [
    {
      id: 1,
      title: "Project 1",
      description: "This is the first project",
    },
    {
      id: 2,
      title: "Project 2",
      description: "This is the second project",
    },
    {
      id: 3,
      title: "Project 3",
      description: "This is the third project",
    },
  ];
  const [initialProjects, setinitialProjects] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3100/api/projects")
            .then(result => {
              setinitialProjects(result.data);
              console.log(result.data)
            })
            .catch(err => console.error(err));
    }, []);


  const navigate = useNavigate();
  const [projects, setProjects] = useState(intialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const handleProjectUpdate = (updatedProject) => {
    if (isAddingProject) {
      setProjects([...projects, updatedProject]);
    } else {
      const newProjects = projects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      );
      setProjects(newProjects);
    }
    closeModal();
  };

  const handleProjectClick = (project) => {
    navigate("/project"); // in the end this will go to a page just for a project
  };

  const handleAddProjectClick = () => {
    setIsModalOpen(true);
    setIsAddingProject(true);
    setEditingProject({ id: projects.length + 1, title: "", description: "" });
  };

  return (
    <>
      <div className="dashboard-container">
        <Sidebar
          className="sidebar-container"
          activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab}
        />
        <div className="content-container">
          <div className="content-header">
            <div className="title">All Projects</div>
            <AiFillPlusCircle
              size={40}
              style={{ cursor: "pointer" }}
              onClick={handleAddProjectClick}
            />
          </div>
          <div className="tasks-container">
            {initialProjects.map((project, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleProjectClick(project)}
              >
                <div className="title">{project.name}</div>
                <div className="description">{project.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
      <ProjectModal
        project={editingProject}
        onUpdate={handleProjectUpdate}
        onClose={() => setIsModalOpen(false)}
        isAdding={isAddingProject}
      />
    )}
    </>
  );
}; //

function ProjectModal({ project, onUpdate, onClose, isAdding }) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...project, title, description });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">
            {isAdding ? "Add Project" : "Edit Project"}
          </span>
          <button onClick={onClose} className="close-button">
            <IoIosCloseCircle size={30} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div>
            <label htmlFor="project-title">Title</label>
            <input
              id="project-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="project-description">Description</label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="modal-submit-button">
            {isAdding ? "Add Project" : "Update Project"}
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

export default Projects;
