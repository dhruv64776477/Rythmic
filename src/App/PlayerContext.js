import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const PlayerContext = createContext();

const INITIAL_TRACKS = [
  {
    id: 'sample-1',
    title: 'Sample Track 1',
    artist: 'Artist 1',
    path: '/audio/Alarm.mp3',
    image: '/images/sample1.jpg',
    duration: 180
  }
];

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(null);
  
  const [tracks, setTracks] = useState(INITIAL_TRACKS);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Handle track changes
  useEffect(() => {
    if (!currentTrack || !audioRef.current) return;

    audioRef.current.src = currentTrack.path;
    audioRef.current.load();
    
    const playPromise = audioRef.current.play();
    if (playPromise) {
      playPromise.catch(error => {
        console.error('Playback failed:', error);
        setIsPlaying(false);
      });
    }

    setIsPlaying(true);
    setIsVisible(true);
  }, [currentTrack]);

  const playTrack = (track) => {
    if (!track) return;

    // Add track to tracks list if it doesn't exist
    if (!tracks.find(t => t.id === track.id)) {
      setTracks(prev => [...prev, track]);
    }

    setCurrentTrack(track);
    setIsPlaying(true);
    setIsVisible(true);
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const closePlayer = () => {
    setIsVisible(false);
  };

  const openPlayer = () => {
    if (currentTrack) {
      setIsVisible(true);
    }
  };

  const playNextTrack = () => {
    if (!currentTrack || tracks.length <= 1) return;
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    playTrack(tracks[nextIndex]);
  };

  const playPreviousTrack = () => {
    if (!currentTrack || tracks.length <= 1) return;
    
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(tracks[prevIndex]);
  };

  const addTracks = (newTracks) => {
    setTracks(prev => {
      const uniqueTracks = newTracks.filter(
        newTrack => !prev.find(track => track.id === newTrack.id)
      );
      return [...prev, ...uniqueTracks];
    });
  };

  const updateVolume = (newVolume) => {
    if (!audioRef.current) return;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const updateProgress = (newProgress) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = newProgress;
    setProgress(newProgress);
    
    if (!isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Error playing audio:', error));
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isVisible,
        isPlaying,
        currentTrack,
        progress,
        duration,
        volume,
        tracks,
        playTrack,
        togglePlayPause,
        closePlayer,
        openPlayer,
        updateProgress,
        updateVolume,
        playNextTrack,
        playPreviousTrack,
        addTracks
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};