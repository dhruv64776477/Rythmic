import React from 'react';
import { Search, Settings,Music } from 'lucide-react';

function Header() {
  return (
    <header className="w-full flex items-center justify-between bg-black p-4 text-white">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold flex">
          <Music className="sidebar-icon"  size={26}/>
          Rythmiq</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-white"
          />
        </div>
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <Settings className="text-gray-400" />
          <div className="flex items-center">
            <img src="/api/placeholder/32/32" alt="profile" className="rounded-full" />
            <span className="ml-2">Dhruv Singh</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
