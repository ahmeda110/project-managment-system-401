import React, { useState, useEffect } from "react";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PiProjectorScreenFill } from "react-icons/pi";
import { FaCalendar } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa6";
import { BsChatRightFill } from "react-icons/bs";

import "../../assets/styles/Sidebar.css";

function Sidebar({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const navigationItems = {
    "Home": { icon: <BsChatRightFill size={16} style={{marginRight: "4px"}} />, link: "/home" },
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
    "Chat": { icon: <BsChatRightFill size={16} style={{marginRight: "4px"}} />, link: "/chat" },
    "Account": { icon: <RiAccountBoxFill size={20} />, link: "/account" },
    
  };

  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth0();
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [memberId, setMemberId] = useState(
    localStorage.getItem("memberId") || ""
  );

  const getuserPermission = async () => {
    const email = user?.email;
    const emailResponse = await axios.get(`/api/members/email/${email}`);
    const memberId = emailResponse.data.memberId;

    if (memberId) {
      axios
        .get(`http://localhost:3100/api/members/${memberId}`)
        .then((result) => {
          let role = "memeber"
          if(result.data.permission) role = result.data.permission
          localStorage.setItem("role", role)
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (user) getuserPermission();
  }, [user]);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const email = user.email;
        const emailResponse = await axios.get(`/api/members/email/${email}`);
        const memberId = emailResponse.data.memberId;
        setMemberId(memberId);
        localStorage.setItem("memberId", memberId);

        const memberNameResponse = await axios.get(
          `/api/members/${memberId}/name`
        );
        const memberName = memberNameResponse.data.name;
        setUserName(memberName);
        localStorage.setItem("userName", memberName);
      } catch (error) {
        console.error("Error fetching member data:", error);
        if (error.response) {
          await createNewMember();
        }
      }
    };

    const createNewMember = async () => {
      try {
        await axios.post("/api/members", {
          email: user.email,
          name: user.name,
        });
        await fetchMemberData();
      } catch (error) {
        console.error("Error creating new member:", error);
      }
    };

    if (isAuthenticated && user) {
      fetchMemberData();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleUsernameChange = async (event) => {
      try {
        if (user?.email && memberId) {
          const updatedUserName = event.detail;
          const response = await axios.put(`/api/members/${memberId}`, {
            name: updatedUserName,
          });
          console.log("Username updated");
        }
        setUserName(event.detail);
        localStorage.setItem("userName", event.detail);
      } catch (error) {
        console.error("Error updating username:", error);
      }
    };

    window.addEventListener("usernameUpdated", handleUsernameChange);

    return () => {
      window.removeEventListener("usernameUpdated", handleUsernameChange);
    };
  }, [user?.email, memberId]);

  const handleItemClick = (itemName, itemLink) => {
    setActiveTab(itemName);
    setActiveSubTab(null);
    navigate(itemLink);
  };

  const handleSubItemClick = (subItemName, subItemLink) => {
    setActiveSubTab(subItemName);
    navigate(subItemLink);
  };

  const handleSignout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("memberId");
    logout();
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="profile">
          {userName && userName.includes(" ") ? (
            <>
              {userName.split(" ")[0][0]}
              {userName.split(" ")[1][0]}
            </>
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
        <div className="signout-item" onClick={handleSignout}>
          <FaSignOutAlt size={20} />
          <span className="signout-text">Signout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
