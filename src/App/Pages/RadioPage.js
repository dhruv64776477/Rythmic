import React from 'react';
import { Radio } from 'lucide-react';
import { motion } from 'framer-motion';

const RadioPage = () => {
  const radioStations = [
    { name: "Top 40 Hits", listeners: "2M listening", genre: "Pop", image: "./image.png" },
    { name: "Hip-Hop Central", listeners: "1.5M listening", genre: "Hip-Hop", image: "./image.png" },
    { name: "Rock Classics", listeners: "1M listening", genre: "Rock", image: "./image.png" },
    { name: "Jazz Café", listeners: "500K listening", genre: "Jazz", image: "./image.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-6 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">Radio Stations</h1>
        <p className="text-lg text-gray-400">Live streams of popular genres and hits</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {radioStations.map((station, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-4 text-white cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={station.image} alt={station.name} className="w-full rounded-lg mb-4" />
            <h3 className="font-semibold text-lg">{station.name}</h3>
            <p className="opacity-80">{station.listeners}</p>
            <span className="inline-block mt-2 bg-white/20 px-2 py-1 rounded-full text-sm">{station.genre}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RadioPage;
