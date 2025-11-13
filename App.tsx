
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import DetailView from './components/DetailView';
import Spinner from './components/Spinner';
import { Movie, MovieDetails } from './types';
import { getMovieSuggestions } from './services/geminiService';
import { searchMovie, getMovieDetails } from './services/tmdbService';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setMovies([]);
    setHasSearched(true);

    try {
      const suggestedTitles = await getMovieSuggestions(query);
      
      if (suggestedTitles.length === 0) {
        setMovies([]);
        setIsLoading(false);
        return;
      }
      
      const moviePromises = suggestedTitles.map(movie => searchMovie(movie.title, movie.year));
      const searchResults = await Promise.all(moviePromises);
      
      const foundMovies = searchResults.flat().filter(movie => movie.poster_path);
      
      // Remove duplicates by ID
      const uniqueMovies = Array.from(new Map(foundMovies.map(movie => [movie.id, movie])).values());

      setMovies(uniqueMovies);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch movie recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectMovie = useCallback(async (movie: Movie) => {
    try {
      const details = await getMovieDetails(movie.id);
      setSelectedMovie(details);
    } catch (err) {
      console.error(err);
      setError('Could not fetch movie details.');
    }
  }, []);

  const handleCloseDetailView = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-center text-gray-400 mb-4">
            Describe the kind of movie you're looking for. For example: "A sci-fi movie about time travel with a twist"
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {isLoading && <Spinner />}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!isLoading && !error && hasSearched && movies.length === 0 && (
          <p className="text-center text-gray-500 text-xl">
            No movies found for your query. Try being more specific or try another idea!
          </p>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelectMovie={handleSelectMovie} />
          ))}
        </div>
      </main>

      {selectedMovie && (
        <DetailView movie={selectedMovie} onClose={handleCloseDetailView} />
      )}
    </div>
  );
};

export default App;
