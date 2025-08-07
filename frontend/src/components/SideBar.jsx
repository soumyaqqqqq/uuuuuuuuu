// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/vite.svg" alt="Logo" className="sidebar-logo" />
        <h2>Vaccine<br/>Dashboard</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/graphs" className={({ isActive }) => (isActive ? 'active' : '')}>
          Graphs
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => (isActive ? 'active' : '')}>
          Map
        </NavLink>
        <NavLink to="/centers" className={({ isActive }) => (isActive ? 'active' : '')}>
          Find Centers
        </NavLink>
      </nav>
      <div className="spacer"></div>
    </div>
  );
};

export default Sidebar;
