import React, { useEffect, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, X } from 'lucide-react';
import Draggable from 'react-draggable';
import { usePlayer } from './PlayerContext';
import '../CSS/Player.css';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const ScrollingText = ({ text }) => {
  return (
    <div className="scrolling-text-container">
      <div className="scrolling-text">
        {text}
      </div>
    </div>
  );
};


const Player = () => {
  const {
    isVisible,
    isPlaying,
    currentTrack,
    progress,
    duration,
    togglePlayPause,
    closePlayer,
    updateProgress,
    playPreviousTrack,
    playNextTrack
  } = usePlayer();

  const [isLongTitle, setIsLongTitle] = useState(false);

  useEffect(() => {
    const titleLength = currentTrack?.title?.length || 0;
    setIsLongTitle(titleLength > 20);
  }, [currentTrack?.title]);

  if (!isVisible || !currentTrack) return null;

  const handleRangeChange = (e) => {
    const newProgress = Number(e.target.value);
    updateProgress(newProgress);
  };

  return (
    <Draggable bounds="parent">
      <div className="player fixed bottom-4 right-4 w-72 bg-gray-900 text-white rounded-lg shadow-lg p-4">
        <div className="player-container flex flex-col space-y-4">
          <button
            onClick={closePlayer}
            className="absolute top-2 right-2 hover:text-gray-400"
            aria-label="Close player"
          >
            <X size={16} />
          </button>

          <div className="player-track-info flex items-center space-x-4">
            <img 
              src={currentTrack.image} 
              alt={`${currentTrack.title} album art`}
              className="player-img w-16 h-16 rounded-md"
            />
            <div className="overflow-hidden w-40">
              <div className="player-title text-lg font-semibold">
                {isLongTitle ? (
                  <ScrollingText text={currentTrack.title} />
                ) : (
                  <span>{currentTrack.title}</span>
                )}
              </div>
              <p className="player-artist text-sm text-gray-400">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={duration || currentTrack.duration}
              value={progress}
              onChange={handleRangeChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              aria-label="Track progress"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration || currentTrack.duration)}</span>
            </div>
          </div>

          <div className="player-controls flex items-center justify-around">
            <button 
              onClick={playPreviousTrack}
              className="cursor-pointer hover:text-blue-500"
              aria-label="Previous track"
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlayPause}
              className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button 
              onClick={playNextTrack}
              className="cursor-pointer hover:text-blue-500"
              aria-label="Next track"
            >
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Player;