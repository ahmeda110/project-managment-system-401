import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import axios from "axios";

import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import Projects from "./components/Projects/Projects";
import Calendar from "./components/Calendar/Calendar";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";

import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Home");
  const [activeSubTab, setActiveSubTab] = useState("");
  const auth0Config = {
    domain: 'dev-rjfhob2dftw24h12.us.auth0.com',
    clientId: 'SflGMkpeqfNqnNmKb822JJypqb7QOPKn',
    redirectUri: window.location.origin
  };

  const navigate = useNavigate();
  const [isPageRefreshed, setIsPageRefreshed] = useState(true);
  useEffect(() => {
    // Redirect to /projects route on page load if user is authenticated
    if (isPageRefreshed) {
      setIsPageRefreshed(false);
      navigate("/home");
    }
  }, [isPageRefreshed, navigate]);

  return (
    <Auth0Provider {...auth0Config}>
        <Routes>
          <Route 
            path="/"
            element={<Login />} />
          <Route
            path="/projects"
            element={
              <Projects activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
            }
          ></Route>
          <Route
            path="/tasks/:id"
            element={
              <Dashboard activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
            }
          ></Route>
          <Route
            path="/account"
            element={
              <Account activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
            }
          ></Route>
          <Route
            path="/calendar-view"
            element={
              <Calendar activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
            }
          ></Route>
<Route
            path="/chat"
            element={
              <Chat activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
            }
          ></Route>
          <Route
            path="/home"
            element={
              <Home activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
            }
          ></Route>
        </Routes>
    </Auth0Provider>
  );
}

export default App;
