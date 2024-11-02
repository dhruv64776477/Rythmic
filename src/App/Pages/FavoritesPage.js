import React from 'react';
import { Heart } from 'lucide-react';

const FavoritesPage = () => {
  const favorites = [
    { title: "Shape of You", artist: "Ed Sheeran", addedDate: "2 months ago", image: "./image.png" },
    { title: "Stay With Me", artist: "Sam Smith", addedDate: "3 months ago", image: "./image.png" },
    { title: "Bad Guy", artist: "Billie Eilish", addedDate: "4 months ago", image: "./image.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <div className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg">
      <h1 className="text-3xl font-bold text-white">Favorites</h1>
      <p className="text-lg text-gray-400">Your all-time favorite songs</p>
      </div>
      <div className="space-y-4">
        {favorites.map((track, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            <img src={track.image} alt={track.title} className="w-12 h-12 rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-white">{track.title}</h3>
              <p className="text-gray-400">{track.artist}</p>
            </div>
            <Heart className="text-red-500" />
            <span className="text-gray-500 text-sm">Added {track.addedDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
