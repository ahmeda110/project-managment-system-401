import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Account from "./components/Account/Account";
import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import Projects from "./components/Projects/Projects";

function App() {
  const [activeTab, setActiveTab] = useState("All tasks");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
  );
}

export default App;
