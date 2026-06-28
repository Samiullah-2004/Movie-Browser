import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { BrowsePage } from './pages/BrowsePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MovieDetailModal } from './components/MovieDetailModal/MovieDetailModal';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  const favoritesApi = {
    favorites,
    isFavorite,
    toggleFavorite,
    onSelectMovie: setSelectedMovieId,
  };

  return (
    <>
      <Header
        query={query}
        onQueryChange={setQuery}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="main">
        <Routes>
          <Route path="/" element={<BrowsePage query={query} favorites={favoritesApi} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favoritesApi} />} />
        </Routes>
      </main>

      <MovieDetailModal
        movieId={selectedMovieId}
        isOpen={selectedMovieId !== null}
        onClose={() => setSelectedMovieId(null)}
        isFavorite={selectedMovieId ? isFavorite(selectedMovieId) : false}
        onToggleFavorite={(movie) => toggleFavorite(movie)}
      />
    </>
  );
}