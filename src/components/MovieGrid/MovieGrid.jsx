import { MovieCard } from '../MovieCard/MovieCard';
import './MovieGrid.css';

export function MovieGrid({ movies, isFavorite, onToggleFavorite, onSelect }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={isFavorite(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}