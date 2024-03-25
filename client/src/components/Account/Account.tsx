import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../SideBar/Sidebar";

import "../../assets/styles/Account.css";

function Account({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  return (
    <>
      <div className="account-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />
        <div className="content-container">Account</div>
      </div>
    </>
  );
}

export default Account;
