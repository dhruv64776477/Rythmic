import React from 'react';
import { Heart } from 'lucide-react';
import Player from './Player'; // Import the Player component
import { motion } from 'framer-motion';
import '../CSS/Explore.css';

const Explore = () => {
  const topArtists = [
    { name: "Arijit Singh", plays: "100M Plays", image: "./image.png" },
    { name: "Neha Kakkar", plays: "90M Plays", image: "./image.png" },
    { name: "Jubin Nautiyal", plays: "80M Plays", image: "./image.png" },
    { name: "Shreya Ghoshal", plays: "75M Plays", image: "./image.png" },
    { name: "Sonu Nigam", plays: "70M Plays", image: "./image.png" },
    { name: "A.R. Rahman", plays: "65M Plays", image: "./image.png" }
  ];

  const genres = [
    { name: 'Dance Beat', color: 'bg-blue-400' },
    { name: 'Electro Pop', color: 'bg-gray-400' },
    { name: 'Alternative Indie', color: 'bg-orange-400' },
    { name: 'Hip Pop', color: 'bg-teal-400' },
    { name: 'Classical Period', color: 'bg-pink-400' },
    { name: 'Rap Hip Pop', color: 'bg-purple-400' }
  ];

  const topCharts = [
    { position: '01', title: 'Jesus Is King', artist: 'Kanye West', duration: '3:45', image: "./image.png" },
    { position: '02', title: 'Lean On', artist: 'Major Lazer ft Dj Snake', duration: '3:45', image: "./image.png" },
    { position: '03', title: 'Havana', artist: 'Camila Cabello', duration: '3:45', image: "./image.png" },
    { position: '04', title: 'Closer', artist: 'The Chainsmoker', duration: '3:45', image: "./image.png" }
  ];

  const currentTrack = topCharts[0];

  return (
    <div className="explore-container">
      <div className="flex-1 overflow-y-auto main">
        {/* Trending Section */}
        <motion.div
          className="trending-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="section-title">Trending New Hits</h1>
          <div className="trending-bg">
            <h1 className="trending-title">Señorita</h1>
            <p className="trending-plays">Camila Cabello · 63 Million Plays</p>
            <div className="trending-actions flex items-center">
              <button className="trending-play-btn">Listen Now</button>
              <button className="trending-heart-btn"><Heart className='m-2' /></button>
            </div>
          </div>
        </motion.div>

        {/* Top Artists */}
        <motion.div
          className="top-artists-container"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="section-header flex justify-between">
            <h1 className="section-title">Top Artists</h1>
            <a href='/artists' className="see-all-btn">See all</a>
          </div>
          <div className="top-artists-grid">
            {topArtists.map((artist, index) => (
              <motion.div
                key={index}
                className="artist-card"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={artist.image} alt={artist.name} className="artist-image" />
                <p className="artist-name">{artist.name}</p>
                <p className="artist-plays">{artist.plays}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Genres and Charts */}
        <div className="genres-charts-grid">
          {/* Genres */}
          <motion.div
            className="genres-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="section-header flex justify-between">
              <h1 className="section-title">Genres</h1>
              <a href='/genres' className="see-all-btn">See all</a>
            </div>
            <div className="genres-grid">
              {genres.map((genre, index) => (
                <motion.div
                  key={index}
                  className={`genre-card ${genre.color}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="genre-name">{genre.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Charts */}
          <motion.div
            className="top-charts-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="section-header flex justify-between">
              <h1 className="section-title">Top Charts</h1>
              <a href='/artists' className="see-all-btn">See all</a>
            </div>
            <div className="top-charts-grid">
              {topCharts.map((track, index) => (
                <motion.div
                  key={index}
                  className="top-chart-track"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="chart-info">
                    <span className="chart-position">{track.position}</span>
                    <img src={track.image} alt={track.title} className="chart-img h-16" />
                    <div>
                      <p className="chart-title">{track.title}</p>
                      <p className="chart-artist">{track.artist}</p>
                    </div>
                  </div>
                  <span className="chart-duration">{track.duration}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
