import React from 'react';
import { Plus } from 'lucide-react';

const CreateNewPage = () => {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-black text-white">
      <div className="bg-gradient-to-r from-gray-900 to-transparent p-8 mb-4 rounded-lg">
        <h1 className="text-2xl font-bold">Create New Playlist</h1>
      </div>
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Playlist Name</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white" 
              placeholder="My Awesome Playlist" 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Description (optional)</label>
            <textarea 
              className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white" 
              rows="3" 
              placeholder="Add an optional description"
            ></textarea>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 w-full">
            <Plus className="inline mr-2" /> Create Playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPage;
