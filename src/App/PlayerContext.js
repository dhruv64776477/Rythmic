// App/PlayerContext.js
import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true); // Player visibility state
  const [isPlaying, setIsPlaying] = useState(false); // Player play/pause state
  const [currentTrack, setCurrentTrack] = useState(null); // Current track state

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setIsVisible(true); // Make sure to show player when a new track is played
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const closePlayer = () => {
    setIsVisible(false); // Set visibility to false
  };

  const openPlayer = () => {
    setIsVisible(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        isVisible,
        isPlaying,
        currentTrack,
        playTrack,
        pauseTrack,
        togglePlayPause,
        closePlayer,
        openPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
