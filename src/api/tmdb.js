const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p';

class TmdbError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(endpoint, params = {}) {
  if (!API_KEY) {
    throw new TmdbError(
      'Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file.',
      0
    );
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  const res = await fetch(url.toString());

  if (!res.ok) {
    if (res.status === 401) {
      throw new TmdbError('Invalid API key.', 401);
    }
    if (res.status === 404) {
      throw new TmdbError('Not found.', 404);
    }
    throw new TmdbError(`Request failed (${res.status}).`, res.status);
  }

  return res.json();
}

export function getImageUrl(path, size = 'w500') {
  if (!path) return null;
  return `${IMG_BASE}/${size}${path}`;
}

export const tmdb = {
  discoverMovies: ({ page = 1, genre, year, sortBy = 'popularity.desc' } = {}) =>
    request('/discover/movie', {
      page,
      with_genres: genre,
      primary_release_year: year,
      sort_by: sortBy,
    }),

  searchMovies: (query, page = 1) =>
    request('/search/movie', { query, page }),

  getMovieDetails: (id) =>
    request(`/movie/${id}`, { append_to_response: 'credits,videos' }),

  getGenres: () => request('/genre/movie/list'),
};

export { TmdbError };