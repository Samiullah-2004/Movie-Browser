import { useEffect, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { Button } from '../Button/Button';
import { tmdb, getImageUrl, TmdbError } from '../../api/tmdb';
import './MovieDetailModal.css';

export function MovieDetailModal({ movieId, isOpen, onClose, isFavorite, onToggleFavorite }) {
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen || !movieId) return;

    let cancelled = false;
    setStatus('loading');
    setMovie(null);

    tmdb
      .getMovieDetails(movieId)
      .then((data) => {
        if (!cancelled) {
          setMovie(data);
          setStatus('success');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setErrorMessage(err instanceof TmdbError ? err.message : 'Failed to load details.');
          setStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, movieId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={movie?.title || 'Movie details'}>
      {status === 'loading' && (
        <div className="detail-modal__loading">Loading details…</div>
      )}

      {status === 'error' && (
        <div className="detail-modal__loading">{errorMessage}</div>
      )}

      {status === 'success' && movie && (
        <div className="detail-modal">
          <div className="detail-modal__poster">
            {movie.poster_path ? (
              <img src={getImageUrl(movie.poster_path, 'w342')} alt={movie.title} />
            ) : (
              <div className="detail-modal__poster-fallback">🎬</div>
            )}
          </div>
          <div className="detail-modal__info">
            <h2>{movie.title}</h2>
            <div className="detail-modal__tags">
              {movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
              {movie.runtime ? <span>{movie.runtime} min</span> : null}
              <span>⭐ {movie.vote_average?.toFixed(1) ?? 'N/A'}</span>
            </div>
            {movie.genres?.length > 0 && (
              <div className="detail-modal__genres">
                {movie.genres.map((g) => (
                  <span key={g.id} className="detail-modal__genre-pill">
                    {g.name}
                  </span>
                ))}
              </div>
            )}
            <p className="detail-modal__overview">
              {movie.overview || 'No overview available.'}
            </p>
            {movie.credits?.cast?.length > 0 && (
              <p className="detail-modal__cast">
                <strong>Cast: </strong>
                {movie.credits.cast.slice(0, 5).map((c) => c.name).join(', ')}
              </p>
            )}
            <Button
              variant={isFavorite ? 'secondary' : 'primary'}
              onClick={() => onToggleFavorite(movie)}
            >
              {isFavorite ? '★ Remove favorite' : '☆ Add to favorites'}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}