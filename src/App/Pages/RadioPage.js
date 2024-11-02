import React from 'react';
import { Radio } from 'lucide-react';

const RadioPage = () => {
  const radioStations = [
    { name: "Top 40 Hits", listeners: "2M listening", genre: "Pop", image: "./image.png" },
    { name: "Hip-Hop Central", listeners: "1.5M listening", genre: "Hip-Hop", image: "./image.png" },
    { name: "Rock Classics", listeners: "1M listening", genre: "Rock", image: "./image.png" },
    { name: "Jazz Café", listeners: "500K listening", genre: "Jazz", image: "./image.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <div className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-6 rounded-lg">
      <h1 className="text-3xl font-bold text-white">Radio Stations</h1>
      <p className="text-lg text-gray-400">Live streams of popular genres and hits</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {radioStations.map((station, index) => (
          <div key={index} className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-4 text-white">
            <img src={station.image} alt={station.name} className="w-full rounded-lg mb-4" />
            <h3 className="font-semibold text-lg">{station.name}</h3>
            <p className="opacity-80">{station.listeners}</p>
            <span className="inline-block mt-2 bg-white/20 px-2 py-1 rounded-full text-sm">{station.genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioPage;
