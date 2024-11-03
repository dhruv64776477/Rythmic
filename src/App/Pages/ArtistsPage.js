import React from 'react';
import { motion } from 'framer-motion';

const ArtistsPage = () => {
  const artists = [
    { name: "Taylor Swift", followers: "100M followers", genres: ["Pop", "Country"], image: "./image.png" },
    { name: "Drake", followers: "85M followers", genres: ["Hip-Hop", "Rap"], image: "./image.png" },
    { name: "The Weeknd", followers: "75M followers", genres: ["R&B", "Pop"], image: "./image.png" },
    { name: "Billie Eilish", followers: "70M followers", genres: ["Pop", "Alternative"], image: "./image.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white">Artists</h1>
        <p className="text-lg text-gray-400">The voices behind the music you love</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {artists.map((artist, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={artist.image} alt={artist.name} className="w-full rounded-full mb-4" />
            <h3 className="font-semibold text-lg text-white">{artist.name}</h3>
            <p className="text-gray-400">{artist.followers}</p>
            <div className="flex gap-2 justify-center mt-2">
              {artist.genres.map((genre, i) => (
                <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistsPage;
