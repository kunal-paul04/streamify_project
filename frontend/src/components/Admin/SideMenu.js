// src/components/SideMenu.js

import React from 'react';
import './AdminDashboard.css';
import { FaHome, FaFire, FaFilm, FaTv, FaList, FaSignOutAlt, FaCloudUploadAlt } from 'react-icons/fa';
import { handleLogout } from '../utils/authUtils'; // Import the logout function
import { Link } from 'react-router-dom'; 


const SideMenu = () => {
  return (
    <aside className="sidemenu">
      <div className="sidemenu__logo">Streamify</div>
      <nav className="sidemenu__nav">
        <a href="#home" className="sidemenu__link">
          <FaHome className="sidemenu__icon" /> Home
        </a>
        <a href="#trending" className="sidemenu__link">
          <FaFire className="sidemenu__icon" /> Trending
        </a>
        <a href="#movies" className="sidemenu__link">
          <FaFilm className="sidemenu__icon" /> Movies
        </a>
        <a href="#shows" className="sidemenu__link">
          <FaTv className="sidemenu__icon" /> Shows
        </a>
        <a href="#mylist" className="sidemenu__link">
          <FaList className="sidemenu__icon" /> My List
        </a>
        <Link to="/media" className="sidemenu__link">
          <FaCloudUploadAlt className="sidemenu__icon" /> Media List
        </Link>
        <a href="#logout" className="sidemenu__link" onClick={handleLogout}>
          <FaSignOutAlt className="sidemenu__icon" /> Logout
        </a>
      </nav>
    </aside>
  );
};

export default SideMenu;
