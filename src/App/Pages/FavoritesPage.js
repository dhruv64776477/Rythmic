// FavoritesPage.js
import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePlayer } from '../Context/PlayerContext';

const FavoritesPage = () => {
  const { playTrack } = usePlayer();

  const favorites = [
    { 
      id: '7',
      title: "Shape of You", 
      artist: "Ed Sheeran", 
      addedDate: "2 months ago", 
      image: "./image.png", 
      path: '/audio/7.mp3',
      duration: 200
    },
    { 
      id: '8',
      title: "Stay With Me", 
      artist: "Sam Smith", 
      addedDate: "3 months ago", 
      image: "./image.png",
      path: '/audio/8.mp3',
      duration: 210 
    },
    { 
      id: '9',
      title: "Bad Guy", 
      artist: "Billie Eilish", 
      addedDate: "4 months ago", 
      image: "./image.png",
      path: '/audio/9.mp3',
      duration: 190 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">Favorites</h1>
        <p className="text-lg text-gray-400">Your all-time favorite songs</p>
      </motion.div>
      
      <div className="space-y-4">
        {favorites.map((track, index) => (
          <motion.div
            key={track.id}
            className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onClick={() => playTrack(track)}
          >
            <img src={track.image} alt={track.title} className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{track.title}</h3>
              <p className="text-gray-400">{track.artist}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="text-red-500 cursor-pointer" />
            </motion.div>
            <span className="text-gray-500 text-sm">Added {track.addedDate}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
