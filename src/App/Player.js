import React, { useEffect, useState } from 'react';
import { Play, SkipBack, SkipForward, Repeat } from 'lucide-react';
import Draggable from 'react-draggable';
import '../CSS/Player.css';

const Player = ({ track }) => {
  const [isLongTitle, setIsLongTitle] = useState(false);
  
  useEffect(() => {
    // Check if the track title is longer than a certain number of characters
    const titleLength = track.title.length;
    setIsLongTitle(titleLength > 20); // You can adjust the character limit as needed
  }, [track.title]);

  return (
    <Draggable bounds="parent">
      {/* Main container with fixed dimensions and styling */}
      <div className="player fixed bottom-4 right-4 w-72 h-52 bg-gray-900 text-white rounded-lg shadow-lg p-4">
        <div className="player-container flex flex-col h-full justify-between">
          {/* Track Info */}
          <div className="player-track-info flex items-center space-x-4">
            <img src={track.image} alt="Now playing" className="player-img w-16 h-16 rounded-md" />
            <div className="overflow-hidden w-40">
              <p className="player-title whitespace-nowrap text-lg font-semibold">
                {isLongTitle ? (
                  <marquee behavior="scroll" direction="left" scrollamount="3" className="overflow-hidden">
                    {track.title}
                  </marquee>
                ) : (
                  <span>{track.title}</span>
                )}
              </p>
              <p className="player-artist text-sm text-gray-400">{track.artist}</p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="player-controls flex items-center justify-around mt-4">
            <SkipBack className="player-skip cursor-pointer hover:text-blue-500" />
            <button className="play-btn bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
              <Play />
            </button>
            <SkipForward className="player-skip cursor-pointer hover:text-blue-500" />
          </div>

          {/* Additional Actions */}
          <div className="player-actions flex justify-between items-center mt-4">
            <Repeat className="player-repeat cursor-pointer hover:text-blue-500" />
            <button className="lyrics-btn text-sm text-blue-400 hover:text-blue-500">LYRICS</button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Player;
