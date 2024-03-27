import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/Chat.css";

import Sidebar from "../SideBar/Sidebar";


const Chat = ({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
        .get(`http://localhost:3100/api/members`)
        .then((result) => {
          setUsers(result.data.map(({ member_id, name }) => ({ member_id, name })));
        })
        .catch((err) => console.error(err));
  }, [])


  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const handleMessageSend = () => {
    if (!selectedUser) return; 

    // Create a new message object
    const newMessageObj = {
      sender: "You",
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessageObj]);

    setNewMessage("");
  };

  return (
    <div className="dashboard-container">
        <Sidebar
          className="sidebar-container"
          activeTab={activeTab}
          activeSubTab={activeSubTab}
          setActiveTab={setActiveTab}
          setActiveSubTab={setActiveSubTab}
        />
        <div className="content-container">
        <div className="chat-container">
      <div className="user-list">
        <h2 style={{ marginBottom: "2.5em" }}>User List</h2>
        {users.map((user) => (
          <div
            key={user.member_id}
            className={`user-item ${selectedUser === user ? "selected" : ""}`}
            onClick={() => handleUserSelect(user)}
          >
            <div className="user-initial">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-name">{user.name}</div>
          </div>
        ))}
      </div>

      <div className="chat-area">
        {selectedUser && (
          <div className="chat-box">
            <h2 style={{textTransform: "capitalize", marginBottom: "1em"}}>{selectedUser.name}</h2>

            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className="message">
                  <span className="sender">{message.sender}: </span>
                  <span className="content">{message.content}</span>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
              ))}
            </div>

            <div className="input-container">
              <input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleMessageSend}>Send</button>
            </div>
          </div>
        )}

        {!selectedUser && <p>Select a user to start chatting</p>}
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default Chat;
