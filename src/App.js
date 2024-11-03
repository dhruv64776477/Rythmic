import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./App/Explore";
import Sidebar from "./App/Sidebar";
import Header from "./App/Header";
import AlbumsPage from "./App/Pages/AlbumsPage";
import ArtistsPage from "./App/Pages/ArtistsPage";
import RadioPage from "./App/Pages/RadioPage";
import RecentPage from "./App/Pages/RecentPage";
import FavoritesPage from "./App/Pages/FavoritesPage";
import LocalPage from "./App/Pages/LocalPage";
import CreateNewPage from "./App/Pages/CreateNewPage";
import GenresPage from "./App/Pages/GenresPage";
import Player from "./App/Player"; // Import Player

function App() {
  const currentTrack = {
    title: 'Jesus Is King',
    artist: 'Kanye West',
    image: './image.png'
  };

  return (
    <Router>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Explore />} />
              <Route path="/albums" element={<AlbumsPage />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/radio" element={<RadioPage />} />
              <Route path="/recent" element={<RecentPage />} />
              <Route path="/favourites" element={<FavoritesPage />} />
              <Route path="/local" element={<LocalPage />} />
              <Route path="/create" element={<CreateNewPage />} />
              <Route path="/genres" element={<GenresPage />} />
            </Routes>
          </div>
        </div>
        {/* Draggable Player Component */}
        <Player track={currentTrack} />
      </div>
    </Router>
  );
}

export default App;
