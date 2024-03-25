import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import Projects from "./components/Projects/Projects";

function App() {
  const [activeTab, setActiveTab] = useState("All tasks");
  const [activeSubTab, setActiveSubTab] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Projects activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />
          }
        ></Route>
        <Route
          path="/project"
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
          path="/my-tasks"
          element={<Tasks activeTab={activeTab} activeSubTab={activeSubTab} setActiveTab={setActiveTab} setActiveSubTab={setActiveSubTab} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
