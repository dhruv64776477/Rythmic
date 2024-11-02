import React from "react";
import { Album } from "lucide-react";

const AlbumsPage = () => {
  const albums = [
    {
      title: "Renaissance",
      artist: "Beyoncé",
      year: "2022",
      tracks: 16,
      image: "./image.png",
    },
    {
      title: "Midnights",
      artist: "Taylor Swift",
      year: "2022",
      tracks: 13,
      image: "./image.png",
    },
    {
      title: "Harry's House",
      artist: "Harry Styles",
      year: "2022",
      tracks: 13,
      image: "./image.png",
    },
    {
      title: "30",
      artist: "Adele",
      year: "2021",
      tracks: 12,
      image: "./image.png",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <div className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg">
      <h1 className="text-3xl font-bold text-white">Albums</h1>
      <p className="text-lg text-gray-400">A collection of your favorite Albums</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {albums.map((album, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
          >
            <img
              src={album.image}
              alt={album.title}
              className="w-full rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg">{album.title}</h3>
            <p className="text-gray-400">{album.artist}</p>
            <p className="text-sm text-gray-500">
              {album.year} • {album.tracks} tracks
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
