import React from 'react';
import { Music, Radio, Heart, Clock, Plus, Library, Home, Search, Settings, ChevronUp, ChevronDown, Play, SkipBack, SkipForward, Repeat, Mic2 } from 'lucide-react';

const MusicPlayer = () => {
  const topArtists = [
    { name: 'Labrinth', plays: '78M Plays', image: '/api/placeholder/100/100' },
    { name: 'Billie Eilish', plays: '67M Plays', image: '/api/placeholder/100/100' },
    { name: 'The Weeknd', plays: '67M Plays', image: '/api/placeholder/100/100' },
    { name: 'Sia', plays: '62M Plays', image: '/api/placeholder/100/100' },
    { name: 'Kanye West', plays: '58M Plays', image: '/api/placeholder/100/100' },
    { name: 'Kid Cudi', plays: '45M Plays', image: '/api/placeholder/100/100' },
  ];

  const genres = [
    { name: 'Dance Beat', color: 'bg-blue-400' },
    { name: 'Electro Pop', color: 'bg-gray-400' },
    { name: 'Alternative Indie', color: 'bg-orange-400' },
    { name: 'Hip Pop', color: 'bg-teal-400' },
    { name: 'Classical Period', color: 'bg-pink-400' },
    { name: 'Rap Hip Pop', color: 'bg-purple-400' },
  ];

  const topCharts = [
    { position: '01', title: 'Jesus Is King', artist: 'Kanye West', duration: '3:45' },
    { position: '02', title: 'Lean On', artist: 'Major Lazer ft Dj Snake', duration: '3:45' },
    { position: '03', title: 'Havana', artist: 'Camila Cabello', duration: '3:45' },
    { position: '04', title: 'Closer', artist: 'The Chainsmoker', duration: '3:45' },
  ];

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 bg-black p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-bold flex items-center">
            <Music className="mr-2" />
            winamp
          </h1>
        </div>

        <nav className="space-y-8">
          <div>
            <p className="text-gray-400 mb-4">MENU</p>
            <ul className="space-y-4">
              <li className="flex items-center text-blue-500"><Home className="mr-2" />Explore</li>
              <li className="flex items-center text-gray-400"><Library className="mr-2" />Genres</li>
              <li className="flex items-center text-gray-400"><Music className="mr-2" />Albums</li>
              <li className="flex items-center text-gray-400"><Mic2 className="mr-2" />Artists</li>
              <li className="flex items-center text-gray-400"><Radio className="mr-2" />Radio</li>
            </ul>
          </div>

          <div>
            <p className="text-gray-400 mb-4">LIBRARY</p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400"><Clock className="mr-2" />Recent</li>
              <li className="flex items-center text-gray-400"><Library className="mr-2" />Albums</li>
              <li className="flex items-center text-gray-400"><Heart className="mr-2" />Favourites</li>
              <li className="flex items-center text-gray-400"><Music className="mr-2" />Local</li>
            </ul>
          </div>

          <div>
            <p className="text-gray-400 mb-4">PLAYLIST</p>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400"><Plus className="mr-2" />Create New</li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Search Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Type here to search"
                className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Settings className="text-gray-400" />
            <div className="flex items-center space-x-2">
              <img src="/api/placeholder/32/32" alt="profile" className="rounded-full" />
              <span>Aisha Ahmed</span>
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trending New Hits</h2>
          <div className="bg-gradient-to-r from-gray-900 to-transparent p-8 rounded-lg">
            <h1 className="text-6xl font-bold mb-2">Señorita</h1>
            <p className="text-xl mb-4">Camila Cabello · 63 Million Plays</p>
            <div className="flex space-x-4">
              <button className="bg-blue-600 px-6 py-2 rounded-full">Listen Now</button>
              <button className="border border-white p-2 rounded-full"><Heart /></button>
            </div>
          </div>
        </div>

        {/* Top Artists */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Top Artists</h2>
            <button className="text-gray-400">See all</button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {topArtists.map((artist, index) => (
              <div key={index} className="text-center">
                <img src={artist.image} alt={artist.name} className="rounded-lg w-full mb-2" />
                <p className="font-medium">{artist.name}</p>
                <p className="text-sm text-gray-400">{artist.plays}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Genres and Charts */}
        <div className="grid grid-cols-2 gap-8">
          {/* Genres */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Genres</h2>
              <button className="text-gray-400">See all</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {genres.map((genre, index) => (
                <div key={index} className={`${genre.color} p-4 rounded-lg`}>
                  <p className="font-medium">{genre.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Charts */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Top Charts</h2>
              <button className="text-gray-400">See all</button>
            </div>
            <div className="space-y-4">
              {topCharts.map((track, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400">{track.position}</span>
                    <img src="/api/placeholder/40/40" alt={track.title} className="rounded" />
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-gray-400">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <div className="flex items-center space-x-4">
            <img src="/api/placeholder/48/48" alt="Now playing" className="rounded" />
            <div>
              <p className="font-medium">Mount Everest</p>
              <p className="text-sm text-gray-400">Labrinth</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <SkipBack className="text-gray-400" />
            <button className="bg-blue-600 p-2 rounded-full"><Play /></button>
            <SkipForward className="text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <Repeat className="text-gray-400" />
            <button className="text-blue-600">LYRICS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;