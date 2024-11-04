import React from "react";
import '../../CSS/Sidebar.css';
import { Music, Radio, Heart, Clock, Plus, Library, Home, Mic2 } from 'lucide-react';
import { useLocation , Link } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {/* Menu sidebar */}
        <div>
          <p className="sidebar-title">MENU</p>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">
                <a className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                  <Home className="nav-icon" />
                  Explore
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/genres">
                <a className={`nav-link ${isActive('/genres') ? 'active' : ''}`}>
                  <Library className="nav-icon" />
                  Genres
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/albums">
                <a className={`nav-link ${isActive('/albums') ? 'active' : ''}`}>
                  <Music className="nav-icon" />
                  Albums
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/artists" >
                <a className={`nav-link ${isActive('/artists') ? 'active' : ''}`}>
                  <Mic2 className="nav-icon" />
                  Artists
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to= "/radio">
                <a className={`nav-link ${isActive('/radio') ? 'active' : ''}`}>
                  <Radio className="nav-icon" />
                  Radio
                </a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Library sidebar */}
        <div>
          <p className="sidebar-title">LIBRARY</p>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to = "/recent">
                <a className={`nav-link ${isActive('/recent') ? 'active' : ''}`}>
                  <Clock className="nav-icon" />
                  Recent
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to = "/favourites">
                <a className={`nav-link ${isActive('/favourites') ? 'active' : ''}`}>
                  <Heart className="nav-icon" />
                  Favourites
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/local">
                <a className={`nav-link ${isActive('/local') ? 'active' : ''}`}>
                  <Music className="nav-icon" />
                  Local
                </a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Playlist sidebar */}
        <div>
          <p className="sidebar-title">PLAYLIST</p>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to = "/create" >
                <a className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
                  <Plus className="nav-icon" />
                  Create New
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
