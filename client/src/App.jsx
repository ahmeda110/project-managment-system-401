import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import axios from "axios";

import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import Projects from "./components/Projects/Projects";
import Calendar from "./components/Calendar/Calendar";

import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("All Projects");
  const [activeSubTab, setActiveSubTab] = useState("");
  const auth0Config = {
    domain: 'dev-rjfhob2dftw24h12.us.auth0.com',
    clientId: 'SflGMkpeqfNqnNmKb822JJypqb7QOPKn',
    redirectUri: window.location.origin
  };

  // const { user } = useAuth0();


  return (
    <Auth0Provider {...auth0Config}>
      <BrowserRouter>
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

        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
