
import { TMDB_API_KEY, TMDB_API_URL } from '../constants';
import { Movie, MovieDetails } from '../types';

const fetcher = async <T,>(endpoint: string): Promise<T> => {
  const url = `${TMDB_API_URL}${endpoint}?api_key=${TMDB_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDb API error: ${response.statusText}`);
  }
  return response.json();
};

export const searchMovie = async (title: string, year?: number): Promise<Movie[]> => {
  let endpoint = `/search/movie?query=${encodeURIComponent(title)}`;
  if(year) {
    endpoint += `&year=${year}`;
  }
  const data = await fetcher<{ results: Movie[] }>(endpoint);
  return data.results;
};

export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  return fetcher<MovieDetails>(`/movie/${movieId}`);
};

export const getSimilarMovies = async (movieId: number): Promise<Movie[]> => {
  const data = await fetcher<{ results: Movie[] }>(`/movie/${movieId}/similar`);
  return data.results;
};
