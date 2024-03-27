import React, { useState, useEffect } from "react";

import { RiHome2Fill } from "react-icons/ri";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { PiProjectorScreenFill } from "react-icons/pi";
import { FaCalendar } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa6";

import axios from "axios";

import "../../assets/styles/Sidebar.css";

function Sidebar({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();
  const [openCategory, setOpenCategory] = useState(null);
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [memberId, setMemberId] = useState("");

  const navigationItems = {
    "All Projects": {
      icon: <PiProjectorScreenFill size={18} />,
      link: "/projects",
      subcategories: {
        "Monthly Tasks": {
          icon: <FaCalendar size={16} />,
          link: "/calendar-view",
        },
        "All Tasks": { icon: <FaBorderAll size={18} />, link: "/tasks/all" },
      },
    },
    Account: { icon: <RiAccountBoxFill size={20} />, link: "/account" },
  };

  const handleItemClick = (itemName, itemLink) => {
    if (itemName === "All Projects" && openCategory !== itemName) {
      setOpenCategory(itemName);
    } else {
      setOpenCategory(null);
    }
    setActiveTab(itemName);
    setActiveSubTab(null);
    navigate(itemLink);
  };

  const handleSubItemClick = (subItemName, subItemLink) => {
    setActiveSubTab(subItemName);
    navigate(subItemLink);
  };

  const updateUserNameFromStorage = (email) => {
    const savedUserName = localStorage.getItem(email);
    setUserName(savedUserName || email);
  };

  useEffect(() => {
    const fetchMemberId = async () => {
      try {
        const response = await axios.get(`/api/members/email/${user.email}`);
        console.log('Response:', response);
        setMemberId(response.data.memberId);

        const memberNameResponse = await axios.get(`/api/members/${response.data.memberId}/name`);
        console.log('Member Name Response:', memberNameResponse);
        const memberName = memberNameResponse.data.name;
        console.log('Member Name:', memberName);
      } catch (error) {
        console.error('Error fetching member ID:', error);
        if (error.response) {
          // If email not found, create a new member
          try {
            const response = await axios.post("/api/members", { email: user.email, name: user.name });
            const memberId = response.data.memberId;
            setMemberId(memberId);

            const memberNameResponse = await axios.get(`/api/members/${memberId}/name`);
            const memberName = memberNameResponse.data.name;
            setUserName(memberName);
          } catch (error) {
            console.error('Error creating new member:', error);
          }
        }
      }
    };

    if (isAuthenticated && user) {
      fetchMemberId();
      localStorage.setItem("userEmail", user.email);
      setUserName(user.email);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleUsernameChange = (event) => {
      if (user?.email) {
        localStorage.setItem(user.email, event.detail);
      }
      setUserName(event.detail);
    };

    window.addEventListener('usernameUpdated', handleUsernameChange);

    return () => {
      window.removeEventListener('usernameUpdated', handleUsernameChange);
    };
  }, [user?.email]);

  useEffect(() => {
    if (user) {
      updateUserNameFromStorage(user.email);
    }
  }, [user]);

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="profile">
        {userName && userName.includes(" ") ? (
            <>{userName.split(" ")[0][0]}{userName.split(" ")[1][0]}</>
          ) : (
            <>{userName?.[0]}</>
        )}
        </div>
        <div className="profile-name">{userName || "Loading..."}</div>
      </div>
      <div className="navigation-items">
        {Object.keys(navigationItems).map((val) => (
          <div key={val}>
            <div
              className={`navigation-item ${activeTab === val ? "active" : ""}`}
              onClick={() => handleItemClick(val, navigationItems[val].link)}
            >
              <div className="displayRow">
                {navigationItems[val].icon}
                <div>{val}</div>
              </div>
            </div>
            {activeTab === val && (
              <div className="subcategory-container">
                {navigationItems[val]?.subcategories &&
                  Object.keys(navigationItems[val].subcategories).map((sub) => (
                    <div
                      key={sub}
                      className={`navigation-item ${
                        activeSubTab === sub ? "active" : ""
                      }`}
                      onClick={() =>
                        handleSubItemClick(
                          sub,
                          navigationItems[val].subcategories[sub].link
                        )
                      }
                    >
                      <div className="displayRow subcategory-item">
                        {navigationItems[val].subcategories[sub].icon}
                        <div>{sub}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="sign-out-container">
        <div className="signout-item" onClick={logout}>
          <FaSignOutAlt size={20} />
          <span className="signout-text">Signout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
