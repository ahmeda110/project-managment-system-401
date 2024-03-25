import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import Projects from "./components/Projects/Projects";

function App() {
  const [activeTab, setActiveTab] = useState("All tasks");
  const auth0Config = {
    domain: 'dev-rjfhob2dftw24h12.us.auth0.com',
    clientId: 'SflGMkpeqfNqnNmKb822JJypqb7QOPKn',
    redirectUri: window.location.origin
  };

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
              <Projects activeTab={activeTab} setActiveTab={setActiveTab} />
            }
          ></Route>
          <Route
            path="/project"
            element={
              <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />
            }
          ></Route>
          <Route
            path="/account"
            element={
              <Account activeTab={activeTab} setActiveTab={setActiveTab} />
            }
          ></Route>
          <Route
            path="/my-tasks"
            element={<Tasks activeTab={activeTab} setActiveTab={setActiveTab} />}
          />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
