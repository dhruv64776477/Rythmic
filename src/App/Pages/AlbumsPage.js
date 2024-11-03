
// AlbumsPage.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TrackListItem from '../Context/TrackListItem';
import { usePlayer } from '../Context/PlayerContext';

const AlbumsPage = () => {
  const { playTrack, addTracks } = usePlayer();

  const albums = [
    {
      title: 'Renaissance',
      artist: 'Beyoncé',
      year: '2022',
      tracks: [
        { 
          id: 'renaissance-1', 
          title: 'Track 1', 
          artist: 'Beyoncé', 
          path: '/audio/1.mp3',
          image: './image.png',
          duration: 180
        },
        { 
          id: 'renaissance-2', 
          title: 'Track 2', 
          artist: 'Beyoncé', 
          path: '/audio/2.mp3',
          image: './image.png',
          duration: 180
        },
      ],
      image: './image.png',
    },
    // ... other albums
  ];

  // Add all tracks to the player context when the page loads
  useEffect(() => {
    const allTracks = albums.flatMap(album => album.tracks);
    addTracks(allTracks);
  }, [addTracks]);

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">Albums</h1>
        <p className="text-lg text-gray-400">A collection of your favorite albums</p>
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
            <img src={album.image} alt={album.title} className="w-full rounded-lg mb-4" />
            <h3 className="font-semibold text-lg text-white">{album.title}</h3>
            <p className="text-gray-400">{album.artist}</p>
            <p className="text-sm text-gray-500">{album.year} • {album.tracks.length} tracks</p>
            
            <div className="mt-4 space-y-2">
              {album.tracks.map((track) => (
                <TrackListItem 
                  key={track.id} 
                  track={track} 
                  onPlay={() => playTrack(track)} 
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;