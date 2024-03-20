import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Dashboard from './components/Dashboard/Dashboard'
import Account from './components/Account/Account'
import "./App.css"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
