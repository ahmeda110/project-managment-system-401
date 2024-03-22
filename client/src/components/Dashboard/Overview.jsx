import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";

function Overview({ activeTab, setActiveTab }) {
    const initialProjects = [
        {
            title: "PROJECT",
            description: "Work to be done by a team",
            mem_ids: ["id1", "id2"],
        },
        {
            title: "Pool Party",
            description: "Have fun under the sun",
            mem_ids: ["id1","id3"],
        },
    ];
    
    const [projects, setProjects] = useState(initialProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [isAddingProject, setIsAddingProject] = useState(false);
    
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    
    const handleProjectUpdate = (updatedProject) => {
        if (isAddingProject) {
          // Handle adding a new project
          setpProjects([...projects, { ...updatedProject, status: false }]);
        } else {
          // Handle updating an existing Project
          const newProjects = projects.map((project, idx) =>
            idx === updatedProject.index ? { ...project, ...updatedProject } : project
          );
          setProjects(newProjects);
        }
        closeModal();
    };

    const handleAddProjectClick = () => {
        setIsModalOpen(true);
        setIsAddingProject(true);
        setEditingProject({
          title: "",
          description: "",
          index: projects.length,
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProject(null);
        setIsAddingProject(false); // Reset the adding task flag
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        setIsSideMenuOpen(true);
      };

    return(
    <>
        <div className="dashboard-container">
            <Sidebar
            className="sidebar-container"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            />
            <div className="content-container">
            <div className="content-header">
                <div className="title">Projects</div>
                <AiFillPlusCircle
                size={40}
                style={{ cursor: "pointer" }}
                onClick={handleAddProjectClick}
                />
            </div>
            <div className="projects-container">
                {projects.map((project, index) => (
                <div
                    className="card"
                    key={index}
                    onClick={() => handleProjectClick(project)}
                >
                    <div className="title">{project.title}</div>
                    <div className="description">{project.description}</div>
                    <div className="card-action-section">
                    
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>

            {isModalOpen && (
            <Modal
            project={editingProject}
            onUpdate={handleProjectUpdate}
            onClose={closeModal}
            isAdding={isAddingProject}
            />
        )}
    </>
    );

    function Modal({ project, onUpdate, onClose, isAdding }) {
        const [title, setTitle] = useState(project?.title || "");
        const [description, setDescription] = useState(project?.description || "");
        const [members, setMembers] = useState(project?.members || []);
        const addMember = (newMember) => {
            setMembers([...members, newMember]);
          };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          const projectData = { title, description, members, index: project?.index };
          onUpdate(projectData);
        };
        

        return (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title">
                  {isAdding ? "Add project" : "Edit project"}
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
                  {isAdding ? "Add project" : "Update project"}
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
}

export default Overview