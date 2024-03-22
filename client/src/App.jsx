import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import Overview from "./components/Dashboard/Overview";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("All tasks");
  const [activeProject, setActiveProject] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Overview activeTab={activeTab} setActiveTab={setActiveTab} />
          }
        />
        <Route
          path="/:projectName"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
