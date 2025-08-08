import {Route, Routes } from "react-router-dom"
import './App.css'

import Signup from './components/Signup'
import Home from "./components/Home"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     
         </>
  )
}

export default App
