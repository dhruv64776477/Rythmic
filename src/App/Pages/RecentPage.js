import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer } from '../Context/PlayerContext';

const RecentPage = () => {
  const { playTrack } = usePlayer();

  const recentlyPlayed = [
    { 
      id: '10', 
      title: "Blinding Lights", 
      artist: "The Weeknd", 
      lastPlayed: "2 hours ago", 
      image: "./image.png", 
      path: "/audio/10.mp3"
    },
    { 
      id: '11', 
      title: "As It Was", 
      artist: "Harry Styles", 
      lastPlayed: "5 hours ago", 
      image: "./image.png", 
      path: "/audio/11.mp3"
    },
    { 
      id: '12', 
      title: "Anti-Hero", 
      artist: "Taylor Swift", 
      lastPlayed: "Yesterday", 
      image: "./image.png", 
      path: "/audio/12.mp3"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-transparent p-8 rounded-lg mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white">Recently Played</h1>
        <p className="text-lg text-gray-400">Tracks you’ve enjoyed recently</p>
      </motion.div>

      <div className="space-y-4">
        {recentlyPlayed.map((track, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-4 p-4 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            onClick={() => playTrack(track)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <img src={track.image} alt={track.title} className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{track.title}</h3>
              <p className="text-gray-400">{track.artist}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Clock size={16} />
              <span>{track.lastPlayed}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentPage;
