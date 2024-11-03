import React from 'react';
import { HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

const LocalPage = () => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-transparent p-8 rounded-lg mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white">Local Files</h1>
        <p className="text-lg text-gray-400">Play music from your local library</p>
      </motion.div>

      <motion.div
        className="bg-gray-800 rounded-lg p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HardDrive className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-400 mb-4">Connect your device to import local music files</p>
        <motion.button
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Connect Device
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LocalPage;
