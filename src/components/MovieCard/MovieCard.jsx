import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { getImageUrl } from '../../api/tmdb';
import './MovieCard.css';

export function MovieCard({ movie, isFavorite, onToggleFavorite, onSelect }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Card onClick={() => onSelect(movie.id)} className="movie-card">
      <div className="movie-card__media-wrap">
        <Card.Media
          src={getImageUrl(movie.poster_path, 'w342')}
          alt={movie.title}
        />
        <button
          className={`movie-card__fav ${isFavorite ? 'movie-card__fav--active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <Card.Body>
        <h3 className="movie-card__title" title={movie.title}>
          {movie.title}
        </h3>
        <div className="movie-card__meta">
          <span>{year}</span>
          <span className="movie-card__rating">⭐ {rating}</span>
        </div>
      </Card.Body>
    </Card>
  );
}