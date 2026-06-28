import { useEffect, useState, useCallback } from 'react';
import { tmdb, TmdbError } from '../api/tmdb';
import { useDebounce } from '../hooks/useDebounce';
import { MovieGrid } from '../components/MovieGrid/MovieGrid';
import { Filters } from '../components/Filters/Filters';
import { LoadingGrid, ErrorState, EmptyState } from '../components/States/States';
import { Button } from '../components/Button/Button';

export function BrowsePage({ query, favorites }) {
  const debouncedQuery = useDebounce(query, 450);

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    tmdb
      .getGenres()
      .then((data) => setGenres(data.genres || []))
      .catch(() => {
        // Non-critical — filters just won't populate
      });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, genre, sortBy]);

  const fetchMovies = useCallback(() => {
    setStatus('loading');
    setErrorMessage('');

    const request = debouncedQuery.trim()
      ? tmdb.searchMovies(debouncedQuery.trim(), page)
      : tmdb.discoverMovies({ page, genre, sortBy });

    request
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
        setStatus('success');
      })
      .catch((err) => {
        setErrorMessage(
          err instanceof TmdbError ? err.message : 'Failed to load movies.'
        );
        setStatus('error');
      });
  }, [debouncedQuery, genre, sortBy, page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="page">
      <div className="page__toolbar">
        <h1 className="page__title">
          {debouncedQuery.trim() ? `Results for "${debouncedQuery.trim()}"` : 'Popular Movies'}
        </h1>
        {!debouncedQuery.trim() && (
          <Filters
            genres={genres}
            genre={genre}
            onGenreChange={setGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
            disabled={status === 'loading'}
          />
        )}
      </div>

      {status === 'loading' && <LoadingGrid />}

      {status === 'error' && (
        <ErrorState message={errorMessage} onRetry={fetchMovies} />
      )}

      {status === 'success' && movies.length === 0 && (
        <EmptyState
          icon="🎞️"
          title="No movies found"
          message="Try a different search term or filter."
        />
      )}

      {status === 'success' && movies.length > 0 && (
        <>
          <MovieGrid
            movies={movies}
            isFavorite={favorites.isFavorite}
            onToggleFavorite={favorites.toggleFavorite}
            onSelect={favorites.onSelectMovie}
          />
          <div className="page__pagination">
            <Button
              variant="secondary"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Previous
            </Button>
            <span className="page__page-indicator">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="secondary"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </Button>
          </div>
        </>
      )}
    </div>
  );
}