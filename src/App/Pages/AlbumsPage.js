import React from "react";
import { Album } from "lucide-react";
import { motion } from "framer-motion"; // Ensure framer-motion is installed

const AlbumsPage = () => {
  const albums = [
    { title: "Renaissance", artist: "Beyoncé", year: "2022", tracks: 16, image: "./image.png" },
    { title: "Midnights", artist: "Taylor Swift", year: "2022", tracks: 13, image: "./image.png" },
    { title: "Harry's House", artist: "Harry Styles", year: "2022", tracks: 13, image: "./image.png" },
    { title: "30", artist: "Adele", year: "2021", tracks: 12, image: "./image.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">Albums</h1>
        <p className="text-lg text-gray-400">A collection of your favorite Albums</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {albums.map((album, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors flex flex-col"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={album.image} alt={album.title} className="w-max rounded-lg mb-4" />
            <h3 className="font-semibold text-lg">{album.title}</h3>
            <p className="text-gray-400">{album.artist}</p>
            <p className="text-sm text-gray-500">{album.year} • {album.tracks} tracks</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
