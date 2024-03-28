import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/Chat.css";
import { useAuth0 } from "@auth0/auth0-react";

import Sidebar from "../SideBar/Sidebar";

const Chat = ({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { user } = useAuth0();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3100/api/members`)
      .then((result) => {
        setUsers(
          result.data.map(({ member_id, name }) => ({ member_id, name }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  const handleUserSelect = async (user) => {
    if (!user) return;
    const currentUser = await getCurrentUserID();

    axios
      .get(`http://localhost:3100/chat/${user.member_id}/${currentUser}`)
      .then((result) => {
        const chatMessages = result.data.map((chat) => ({
          sender: chat.member_id_from === currentUser ? "You" : user.name,
          content: chat.message,
          timestamp: chat.created_at,
        }));
        setMessages(chatMessages);
      })
      .catch((err) => console.error(err));

    setSelectedUser(user);
  };

  const getCurrentUserID = async () => {
    const email = user?.email;
    const emailResponse = await axios.get(`/api/members/email/${email}`);
    const memberId = emailResponse.data.memberId;

    return memberId;
  };

  const handleMessageSend = async () => {
    if (!selectedUser) return;

    axios
      .post("http://localhost:3100/chat", {
        member_id_to: selectedUser.member_id,
        member_id_from: await getCurrentUserID(),
        message: newMessage,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));

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
            <h2>User List</h2>
            {users.map((user) => (
              <div
                key={user.member_id}
                className={`user-item ${
                  selectedUser === user ? "selected" : ""
                }`}
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
                <h2>{selectedUser.name}</h2>

                <div className="messages">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${
                        message.sender === "You" ? "sent" : "received"
                      }`}
                    >
                      {message.sender !== "You" && (
                        <div className="circle-initial">
                          {message.sender.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="message-content">
                        <div className="message-details">
                          <span className="sender">{message.sender}</span>
                        </div>
                        <div className="message-text">{message.content}</div>
                      </div>
                      {message.sender === "You" && (
                        <div className="circle-initial">
                          {message.sender.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="input-container" style={{ maxWidth: "40%" }}>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ maxWidth: "80%" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        console.log("hit enter, sending");
                        // Checks if the Enter key is pressed without holding the Shift key
                        e.preventDefault(); // Prevents the default action of the Enter key which is usually form submission or line break in textarea
                        handleMessageSend(); // Calls your function to send the message
                      }
                    }}
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
