import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";

import { useAuth0 } from "@auth0/auth0-react";

import "../../assets/styles/Account.css";

function Account({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const [newUsername, setNewUsername] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPermission, setNewPermission] = useState("");

  const handleUsernameChange = (e) => setNewUsername(e.target.value);
  const handlePhoneNumberChange = (e) => setNewPhoneNumber(e.target.value);
  const handleEmailChange = (e) => setNewEmail(e.target.value);
  const handleNewPermissionChange = (e) => setNewPermission(e.target.value);

  const { user } = useAuth0();

  const getUserID = async() => {
    const email = user?.email;
    const emailResponse = await axios.get(`/api/members/email/${email}`);
    const memberId = emailResponse.data.memberId;

    return memberId;
  }

  useEffect(() => {
    const fetchMemberID = async () => {
      try {
        const memberID = await getUserID();
        console.log(memberID);
  
        const result = await axios.get(`http://localhost:3100/api/members/${memberID}`);
          setNewUsername(result.data.name || "");
          setNewPhoneNumber(result.data.phone_number || "")
          setNewEmail(result.data.email || "");
          setNewPermission(result.data.permission || "")
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchMemberID();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const memberID = await getUserID();

      axios
      .put(`http://localhost:3100/api/members/${memberID}`, {
        name: newUsername,
        phone_number: newPhoneNumber,
        email: newEmail,
        permission: newPermission
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));

      const event = new CustomEvent("usernameUpdated", { detail: newUsername });
      window.dispatchEvent(event);

      setNewUsername(""); 
      setNewPhoneNumber("");
      setNewEmail("");
      setNewPermission("");

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
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          setActiveTab={setActiveTab}
          setActiveSubTab={setActiveSubTab}
        />
        <div className="content-container">
          <div className="content-header">
            <div className="title">Account</div>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="update-form">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1em",
                    width: "49%",
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="newUsername">Name:</label>
                    <input
                      type="text"
                      id="newUsername"
                      value={newUsername}
                      onChange={handleUsernameChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newUsername">Phone Number:</label>
                    <input
                      type="text"
                      id="newUsername"
                      maxLength={10}
                      value={newPhoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newUsername">Email Address:</label>
                    <input
                      type="text"
                      id="newUsername"
                      value={newEmail}
                      onChange={handleEmailChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group" style={{ display: "flex", flexDirection: "column"}}>
                    <label htmlFor="assignedTo">Role</label>{" "}
                    {/* Assigned to dropdown */}
                    <select
                      id="assignedTo"
                      value={newPermission}
                      onChange={handleNewPermissionChange}
                      style={{height: "50px"}}
                    >
                      <option value="">Select a role</option>
                      <option value="member">Member</option>
                      <option value="admin">Admin</option>
                      <option value="leader">Leader</option>
                    </select>
                  </div>
                </div>
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
