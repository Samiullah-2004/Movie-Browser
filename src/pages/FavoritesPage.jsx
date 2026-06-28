import { MovieGrid } from '../components/MovieGrid/MovieGrid';
import { EmptyState } from '../components/States/States';

export function FavoritesPage({ favorites }) {
  if (favorites.favorites.length === 0) {
    return (
      <div className="page">
        <h1 className="page__title">Favorites</h1>
        <EmptyState
          icon="⭐"
          title="No favorites yet"
          message="Tap the star on any movie to save it here."
        />
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page__title">Favorites ({favorites.favorites.length})</h1>
      <MovieGrid
        movies={favorites.favorites}
        isFavorite={favorites.isFavorite}
        onToggleFavorite={favorites.toggleFavorite}
        onSelect={favorites.onSelectMovie}
      />
    </div>
  );
}