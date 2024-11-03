import React from 'react';
import { Play, Pause } from 'lucide-react';
import { usePlayer } from './PlayerContext';

const TrackListItem = ({ track }) => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = usePlayer();
  
  const handleClick = () => {
    if (currentTrack?.id === track.id) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  const isCurrentTrack = currentTrack?.id === track.id;

  return (
    <div className="flex items-center space-x-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
      <img 
        src={track.image} 
        alt={track.title} 
        className="w-12 h-12 rounded-md"
      />
      <div className="flex-1">
        <h3 className="font-medium">{track.title}</h3>
        <p className="text-sm text-gray-500">{track.artist}</p>
      </div>
      <button 
        onClick={handleClick}
        className={`p-2 rounded-full ${isCurrentTrack ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}
      >
        {isCurrentTrack && isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
};

export default TrackListItem;