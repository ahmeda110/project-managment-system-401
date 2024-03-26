import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";

import "../../assets/styles/Account.css";

function Account({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const [newUsername, setNewUsername] = useState("");

  const handleUsernameChange = (e) => setNewUsername(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace the logic here with your API call to update the username
    try {
      // Example: await axios.post('/api/update-username', { username: newUsername });

      // Dispatch the custom event with the new username
      const event = new CustomEvent('usernameUpdated', { detail: newUsername });
      window.dispatchEvent(event);

      localStorage.setItem("userName", newUsername); // Update localStorage
      setNewUsername(""); // Reset input field

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };
  
  return (
    <>
      <div className="dashboard-container">
        <Sidebar
          activeTab={activeTab} activeSubTab={activeSubTab}
          setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab}
        />
        <div className="content-container">
          <div className="content-header">
            <div className="title">Account</div>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="update-form">
              <div className="form-group">
                <label htmlFor="newUsername">New Username:</label>
                <input
                  type="text"
                  id="newUsername"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="update-button">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
