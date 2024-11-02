// Player.js
import React from 'react';
import { Play, SkipBack, SkipForward, Repeat } from 'lucide-react';
import '../CSS/Player.css'; // Optional: Add your own styles for the Player component

const Player = ({ track }) => {
  return (
    <div className="player">
      <div className="player-container">
        <div className="player-track-info">
          <img src={track.image} alt="Now playing" className="player-img" />
          <div>
            <p className="player-title">{track.title}</p>
            <p className="player-artist">{track.artist}</p>
          </div>
        </div>
        <div className="player-controls">
          <SkipBack className="player-skip" />
          <button className="play-btn"><Play /></button>
          <SkipForward className="player-skip" />
        </div>
        <div className="player-actions">
          <Repeat className="player-repeat" />
          <button className="lyrics-btn">LYRICS</button>
        </div>
      </div>
    </div>
  );
};

export default Player;
