import React, { useState } from 'react';
import { Play, ChevronRight } from 'lucide-react';

const GenrePage = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const genres = [
    {
      name: "Hip Hop",
      color: "from-orange-400 to-red-500",
      description: "Beats, rhymes and urban vibes",
      monthlyListeners: "120M",
      popularTags: ["Rap", "Trap", "Urban"]
    },
    {
      name: "Pop",
      color: "from-pink-400 to-purple-500",
      description: "Chart-topping hits and catchy melodies",
      monthlyListeners: "150M",
      popularTags: ["Mainstream", "Dance", "Chart Hits"]
    },
    {
      name: "Rock",
      color: "from-blue-400 to-indigo-500",
      description: "Guitar-driven anthems and powerful vocals",
      monthlyListeners: "90M",
      popularTags: ["Alternative", "Classic Rock", "Metal"]
    },
    {
      name: "Electronic",
      color: "from-green-400 to-teal-500",
      description: "Synthesized sounds and digital beats",
      monthlyListeners: "80M",
      popularTags: ["EDM", "House", "Techno"]
    },
    {
      name: "R&B",
      color: "from-purple-400 to-pink-500",
      description: "Smooth grooves and soulful vocals",
      monthlyListeners: "70M",
      popularTags: ["Soul", "Contemporary", "Blues"]
    },
    {
      name: "Jazz",
      color: "from-yellow-400 to-orange-500",
      description: "Improvisational and sophisticated",
      monthlyListeners: "40M",
      popularTags: ["Bebop", "Swing", "Contemporary"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <div className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Explore Genres</h1>
        <p className="text-gray-400">Discover music across different styles and moods</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {genres.map((genre, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-300 
              hover:shadow-xl ${selectedGenre === genre.name ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => setSelectedGenre(genre.name)}
          >
            <div className="relative h-64 bg-gray-800 rounded-xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-90`}></div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{genre.name}</h3>
                  <p className="text-white/80 mb-4">{genre.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {genre.popularTags.map((tag, idx) => (
                      <span key={idx} className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">
                    {genre.monthlyListeners} monthly listeners
                  </span>
                  <button
                    className="bg-white text-black rounded-full px-4 py-2 flex items-center gap-2 
                      hover:bg-white/90 transition-colors"
                  >
                    <Play size={16} /> Mix
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedGenre && (
        <div className="mt-12 p-6 bg-gray-900 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Featured in {selectedGenre}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2 text-white">Top Artists</h3>
              <p className="text-gray-400">Discover the most popular {selectedGenre} artists</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2 text-white">New Releases</h3>
              <p className="text-gray-400">Latest {selectedGenre} tracks and albums</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
