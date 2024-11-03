import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from './PlayerContext';

const TrackPlayButton = ({ track, className = '' }) => {
  const { 
    playTrack, 
    pauseTrack, 
    isPlaying, 
    currentTrack 
  } = usePlayer();

  const isCurrentTrack = currentTrack?.id === track.id;
  const isThisTrackPlaying = isPlaying && isCurrentTrack;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isCurrentTrack) {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack(track);
      }
    } else {
      playTrack(track);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white ${className}`}
      aria-label={isThisTrackPlaying ? 'Pause' : 'Play'}
    >
      {isThisTrackPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
  );
};

export default TrackPlayButton;