import React, { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import Draggable from "react-draggable";
import { usePlayer } from "../Context/PlayerContext";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const ScrollingText = ({ text }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {text}
        <span className="mx-4">&nbsp;</span>
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
    playNextTrack,
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

  const progressPercentage =
    (progress / (duration || currentTrack.duration)) * 100 || 0;

  return (
    <Draggable bounds="parent">
      <div className="fixed bottom-4 right-4 w-72 bg-gray-900 text-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col space-y-4">
          <button
            onClick={closePlayer}
            className="absolute top-2 right-2 hover:text-gray-400 transition-colors"
            aria-label="Close player"
          >
            <X size={16} />
          </button>

          <div className="flex items-center space-x-4">
            <img
              src={currentTrack.image}
              alt={`${currentTrack.title} album art`}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 overflow-hidden">
              <div className="font-semibold mb-1">
                {isLongTitle ? (
                  <ScrollingText text={currentTrack.title} />
                ) : (
                  <span className="block truncate">{currentTrack.title}</span>
                )}
              </div>
              <p className="text-sm text-gray-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative h-1 bg-gray-700 rounded-full">
              <input
                type="range"
                min="0"
                max={duration || currentTrack.duration}
                value={progress}
                onChange={handleRangeChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                style={{
                  WebkitAppearance: "none",
                  appearance: "none",
                }}
                aria-label="Track progress"
              />
              <div
                className="absolute h-full bg-blue-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration || currentTrack.duration)}</span>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={playPreviousTrack}
              className="p-2 hover:text-blue-500 transition-colors"
              aria-label="Previous track"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={togglePlayPause}
              className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} className="ml-0.5" />
              )}
            </button>

            <button
              onClick={playNextTrack}
              className="p-2 hover:text-blue-500 transition-colors"
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
