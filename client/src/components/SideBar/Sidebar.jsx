import React, { useState } from "react";

import ProfilePic from "../../assets/images/profile.jpeg";

import { RiHome2Fill } from "react-icons/ri";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "../../assets/styles/Sidebar.css";

function Sidebar({ activeTab, setActiveTab }) {
  const navigationItems = {
    "All projects": { icon: <RiHome2Fill size={18} />, link: "/" },
    "My Tasks": { icon: <RiHome2Fill size={18} />, link: "/my-tasks" },
    Account: { icon: <RiAccountBoxFill size={20} />, link: "/account" },
  };

  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={ProfilePic} />
        <div className="profile-name">
          Ahmed
          <br />
          Abbas
        </div>
      </div>
      <div className="navigation-items">
        {Object.keys(navigationItems).map((val) => (
          <div
            key={val}
            className={`navigation-item ${activeTab == val ? "active" : ""}`}
            onClick={() => {
              setActiveTab(val);
              navigate(navigationItems[val].link);
            }}
          >
            {navigationItems[val].icon}
            <div>{val}</div>
          </div>
        ))}
      </div>
      <div className="sign-out-container">
        <div className="signout-item">
          <FaSignOutAlt size={20} />
          <div>Singout</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
