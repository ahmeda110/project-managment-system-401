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

  const initialTasks = [
    {
      title: "Dentist Appointment",
      description: "Schedule a 6-month check-up with the dentist",
      due: "2025-10-25",
      status: true,
      project: 1
    },
    {
      title: "Grocery Shopping",
      description: "Buy groceries for the week",
      due: "2025-10-26",
      status: false,
      project: 1
    },
    {
      title: "Car Service",
      description: "Take the car for its annual service",
      due: "2025-11-01",
      status: true,
      project: 1
    },
    {
      title: "Book Club",
      description: "Prepare for the next book club meeting",
      due: "2025-11-05",
      status: false,
      project: 1
    },
    {
      title: "Renew Gym Membership",
      description: "Renew the annual gym membership",
      due: "2025-11-10",
      status: true,
      project: 2
    },
  ];
  const navigate = useNavigate();
  const [projects, setProjects] = useState(intialProjects);

  const handleProjectClick = (project) => {
    setProjectClicked(true);
    //navigate("/project"); // in the end this will go to a page just for a project
  };

  const getAlltasksByProjectID = (id) => {

    return [
      {
        title: "Dentist Appointment",
        description: "Schedule a 6-month check-up with the dentist",
        due: "2025-10-25",
        status: true,
        project: 1
      },
      {
        title: "Grocery Shopping",
        description: "Buy groceries for the week",
        due: "2025-10-26",
        status: false,
        project: 1
      },
      {
        title: "Car Service",
        description: "Take the car for its annual service",
        due: "2025-11-01",
        status: true,
        project: 1
      },
      {
        title: "Book Club",
        description: "Prepare for the next book club meeting",
        due: "2025-11-05",
        status: false,
        project: 1
      },
    ];
  }

  const handleAddProjectClick = () => {
    // will need modal for new project and stuff
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
        {projectClicked &&
          <Dashboard initialTasks={initialTasks} activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
        }
      </div>
    </>
  );
}; //

export default Projects;
