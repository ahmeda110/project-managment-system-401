import React, { useState } from "react";
import ProfilePic from "../../assets/images/profile.jpeg";
import { RiHome2Fill } from "react-icons/ri";
import { RiAccountBoxFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Sidebar.css";

function Sidebar({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const navigationItems = {
    "All projects": {
      icon: <RiHome2Fill size={18} />,
      link: "/",
      subcategories: {
        "My Tasks": { icon: <RiHome2Fill size={18} />, link: "/my-tasks" },
        "Test": { icon: <RiHome2Fill size={18} />, link: "/test" },
      },
    },
    Account: { icon: <RiAccountBoxFill size={20} />, link: "/account" },
  };

  const navigate = useNavigate();
  const [openCategory, setOpenCategory] = useState(null);

  const handleItemClick = (itemName, itemLink) => {
    if (itemName === "All projects" && openCategory !== itemName) {
      setOpenCategory(itemName);
    } else {
      setOpenCategory(null);
    }
    setActiveTab(itemName);
    navigate(itemLink);
  };

  const handleSubItemClick = (subItemName, subItemLink) => {
    setActiveSubTab(subItemName);
    navigate(subItemLink);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={ProfilePic} alt="Profile" />
        <div className="profile-name">
          Ahmed
          <br />
          Abbas
        </div>
      </div>
      <div className="navigation-items">
        {Object.keys(navigationItems).map((val) => (
          <div key={val}>
            <div
              className={`navigation-item ${
                activeTab === val ? "active" : ""
              }`}
              onClick={() => handleItemClick(val, navigationItems[val].link)}
            >
              <div className="displayRow">
                {navigationItems[val].icon}
                <div>{val}</div>
              </div>
            </div>
            {activeTab === val &&
              navigationItems[val]?.subcategories &&
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
                  <div className="displayRow">
                    {navigationItems[val].subcategories[sub].icon}
                    <div>{sub}</div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="sign-out-container">
        <div className="signout-item">
          <FaSignOutAlt size={20} />
          <div>Signout</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
