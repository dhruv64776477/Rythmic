import React from 'react';
import { Clock } from 'lucide-react';

const RecentPage = () => {
  const recentlyPlayed = [
    { title: "Blinding Lights", artist: "The Weeknd", lastPlayed: "2 hours ago", image: "./image.png" },
    { title: "As It Was", artist: "Harry Styles", lastPlayed: "5 hours ago", image: "./image.png" },
    { title: "Anti-Hero", artist: "Taylor Swift", lastPlayed: "Yesterday", image: "./image.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <div className="bg-gradient-to-r from-gray-900 to-transparent p-8 rounded-lg mb-6">
      <h1 className="text-3xl font-bold text-white">Recently Played</h1>
      <p className="text-lg text-gray-400">Tracks you’ve enjoyed recently</p>
      </div>
      <div className="space-y-4">
        {recentlyPlayed.map((track, index) => (
          <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-700 rounded-lg transition-colors">
            <img src={track.image} alt={track.title} className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{track.title}</h3>
              <p className="text-gray-400">{track.artist}</p>
            </div>
            <span className="text-gray-500 text-sm">{track.lastPlayed}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPage;
