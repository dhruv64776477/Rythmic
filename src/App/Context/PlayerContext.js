import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const PlayerContext = createContext();

const STORAGE_KEYS = {
  TRACKS: 'player_tracks',
  CURRENT_TRACK: 'player_currentTrack',
  PROGRESS: 'player_progress',
  VOLUME: 'player_volume',
  IS_PLAYING: 'player_isPlaying',
  IS_VISIBLE: 'player_isVisible'
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};

export const PlayerProvider = ({ children }) => {
  const [audioElement] = useState(() => {
    const audio = new Audio();
    audio.onerror = (e) => {
      console.error('Audio element error:', {
        error: audio.error,
        errorCode: audio.error?.code,
        errorMessage: audio.error?.message,
        src: audio.src,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
    };
    return audio;
  });
  
  const audioRef = useRef(audioElement);
  const isInitialMount = useRef(true);
  
  // Initialize state from localStorage
  const [tracks, setTracks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRACKS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading tracks from localStorage:', error);
      return [];
    }
  });
  
  const [currentTrack, setCurrentTrack] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_TRACK);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading currentTrack from localStorage:', error);
      return null;
    }
  });
  
  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_PLAYING) === 'true';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.IS_VISIBLE) === 'true';
  });
  
  const [progress, setProgress] = useState(() => {
    return parseFloat(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || 0;
  });
  
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem(STORAGE_KEYS.VOLUME)) || 1;
  });

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, save current progress
        localStorage.setItem(STORAGE_KEYS.PROGRESS, audioRef.current.currentTime);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Restore playback state on mount
  useEffect(() => {
    if (currentTrack && isInitialMount.current) {
      const savedProgress = parseFloat(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || 0;
      
      audioRef.current.src = currentTrack.path;
      audioRef.current.currentTime = savedProgress;
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise) {
          playPromise.catch(error => {
            console.error('Playback failed on restore:', error);
            setIsPlaying(false);
            setError('Failed to restore playback');
          });
        }
      }
      
      isInitialMount.current = false;
    }
  }, [currentTrack, isPlaying]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      const currentTime = audio.currentTime;
      setProgress(currentTime);
      localStorage.setItem(STORAGE_KEYS.PROGRESS, currentTime.toString());
    };
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      if (!isInitialMount.current) {
        const savedProgress = parseFloat(localStorage.getItem(STORAGE_KEYS.PROGRESS)) || 0;
        audio.currentTime = savedProgress;
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      localStorage.setItem(STORAGE_KEYS.PROGRESS, '0');
      localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'false');
      playNextTrack();
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
      setError('Error playing audio');
      localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'false');
    };
    
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    audio.volume = volume;
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [volume]);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRACKS, JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    if (currentTrack) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_TRACK, JSON.stringify(currentTrack));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_TRACK);
    }
  }, [currentTrack]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IS_VISIBLE, isVisible.toString());
    localStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString());
    localStorage.setItem(STORAGE_KEYS.IS_PLAYING, isPlaying.toString());
  }, [isVisible, volume, isPlaying]);

  const playTrack = async (track) => {
    if (!track) {
      console.error('No track provided to playTrack');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      if (!tracks.find(t => t.id === track.id)) {
        setTracks(prev => [...prev, track]);
      }

      const isSameTrack = currentTrack?.id === track.id;
      
      if (!isSameTrack) {
        const audio = audioRef.current;
        audio.src = track.path;
        setCurrentTrack(track);
        setProgress(0);
        localStorage.setItem(STORAGE_KEYS.PROGRESS, '0');
      }

      await audioRef.current.play();
      
      setIsPlaying(true);
      setIsVisible(true);
      localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'true');
      localStorage.setItem(STORAGE_KEYS.IS_VISIBLE, 'true');
    } catch (error) {
      console.error('Error playing track:', error);
      setError(error.message);
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'false');
    } finally {
      setIsLoading(false);
    }
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    localStorage.setItem(STORAGE_KEYS.IS_PLAYING, 'false');
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack(currentTrack);
    }
  };

  const closePlayer = () => {
    setIsVisible(false);
    pauseTrack();
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
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      localStorage.setItem(STORAGE_KEYS.VOLUME, newVolume.toString());
    }
  };

  const updateProgress = (newProgress) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress;
      setProgress(newProgress);
      localStorage.setItem(STORAGE_KEYS.PROGRESS, newProgress.toString());
    }
  };

  const seekForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 10, audioRef.current.duration);
      updateProgress(newTime);
    }
  };

  const seekBackward = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 10, 0);
      updateProgress(newTime);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isVisible,
        isPlaying,
        isLoading,
        error,
        currentTrack,
        progress,
        duration,
        volume,
        tracks,
        playTrack,
        pauseTrack,
        togglePlayPause,
        closePlayer,
        openPlayer,
        updateProgress,
        updateVolume,
        playNextTrack,
        playPreviousTrack,
        addTracks,
        seekForward,
        seekBackward
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;