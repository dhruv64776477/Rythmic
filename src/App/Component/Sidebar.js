import React from "react";
import '../../CSS/Sidebar.css';
import { Music, Radio, Heart, Clock, Plus, Library, Home, Mic2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

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
              <a href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                <Home className="nav-icon" />
                Explore
              </a>
            </li>
            <li className="nav-item">
              <a href="/genres" className={`nav-link ${isActive('/genres') ? 'active' : ''}`}>
                <Library className="nav-icon" />
                Genres
              </a>
            </li>
            <li className="nav-item">
              <a href="/albums" className={`nav-link ${isActive('/albums') ? 'active' : ''}`}>
                <Music className="nav-icon" />
                Albums
              </a>
            </li>
            <li className="nav-item">
              <a href="/artists" className={`nav-link ${isActive('/artists') ? 'active' : ''}`}>
                <Mic2 className="nav-icon" />
                Artists
              </a>
            </li>
            <li className="nav-item">
              <a href="/radio" className={`nav-link ${isActive('/radio') ? 'active' : ''}`}>
                <Radio className="nav-icon" />
                Radio
              </a>
            </li>
          </ul>
        </div>

        {/* Library sidebar */}
        <div>
          <p className="sidebar-title">LIBRARY</p>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/recent" className={`nav-link ${isActive('/recent') ? 'active' : ''}`}>
                <Clock className="nav-icon" />
                Recent
              </a>
            </li>
            <li className="nav-item">
              <a href="/favourites" className={`nav-link ${isActive('/favourites') ? 'active' : ''}`}>
                <Heart className="nav-icon" />
                Favourites
              </a>
            </li>
            <li className="nav-item">
              <a href="/local" className={`nav-link ${isActive('/local') ? 'active' : ''}`}>
                <Music className="nav-icon" />
                Local
              </a>
            </li>
          </ul>
        </div>

        {/* Playlist sidebar */}
        <div>
          <p className="sidebar-title">PLAYLIST</p>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
                <Plus className="nav-icon" />
                Create New
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
