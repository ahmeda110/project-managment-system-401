import React, { useState, useEffect } from "react";

import ProfilePic from "../../assets/images/profile.jpeg";

import { RiHome2Fill } from "react-icons/ri";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

import "../../assets/styles/Sidebar.css";

function Sidebar({ activeTab, setActiveTab }) {
  const navigationItems = {
    "All tasks": { icon: <RiHome2Fill size={18} />, link: "/" },
    Account: { icon: <RiAccountBoxFill size={20} />, link: "/account" },
  };

  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      localStorage.setItem('userName', user.name);
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    }
  }, [user]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={ProfilePic} alt="Profile" />
        <div className="profile-name">
          {userName || "Loading..."}
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
          <button onClick={logout}>Signout</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
