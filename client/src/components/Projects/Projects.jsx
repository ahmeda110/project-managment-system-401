import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiHome2Fill } from "react-icons/ri";

import "../../assets/styles/Dashboard.css";
import "../../assets/styles/Modal.css";

const Projects = ({ activeTab, setActiveTab }) => {
  const intialProjects = [
    {
      title: "Project 1",
      description: "This is the first project",
    },
    {
      title: "Project 2",
      description: "This is the second project",
    },
    {
      title: "Project 3",
      description: "This is the third project",
    },
  ];
  const navigate = useNavigate();
  const [projects, setProjects] = useState(intialProjects);

  const handleProjectClick = (project) => {
    navigate("/project"); // in the end this will go to a page just for a project
  };

  const handleAddProjectClick = () => {
    // will need modal for new project and stuff
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
            <div className="title">All Projects</div>
            <AiFillPlusCircle
              size={40}
              style={{ cursor: "pointer" }}
              onClick={handleAddProjectClick}
            />
          </div>
          <div className="tasks-container">
            {projects.map((project, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleProjectClick(project)}
              >
                <div className="title">{project.title}</div>
                <div className="description">{project.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}; //

export default Projects;
