
import React, { useState, useEffect } from 'react';
import { Movie, MovieDetails } from '../types';
import { getSimilarMovies } from '../services/tmdbService';
import { TMDB_IMAGE_URL } from '../constants';
import MovieCard from './MovieCard';
import Spinner from './Spinner';
import { CloseIcon, ClockIcon, StarIcon } from './Icon';

interface DetailViewProps {
  movie: MovieDetails;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ movie, onClose }) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      setIsLoading(true);
      try {
        const movies = await getSimilarMovies(movie.id);
        setSimilarMovies(movies.filter(m => m.poster_path).slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch similar movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilar();
  }, [movie.id]);

  const handleSelectMovie = (m: Movie) => {
    // This is a placeholder for potential navigation logic in a more complex app.
    // For now, it does nothing as we are already in a modal.
    console.log("Selected similar movie:", m.title);
  };
  
  const backdropUrl = movie.poster_path ? `${TMDB_IMAGE_URL}${movie.poster_path}` : '';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl shadow-orange-900/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10">
          <CloseIcon className="w-8 h-8"/>
        </button>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
          <img src={backdropUrl} alt={`Backdrop for ${movie.title}`} className="w-full h-64 md:h-80 object-cover object-top" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white">{movie.title}</h2>
            {movie.tagline && <p className="text-lg text-gray-300 italic mt-1">"{movie.tagline}"</p>}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-400 mb-4">
            <span>{releaseYear}</span>
            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-5 h-5"/>
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <StarIcon className="w-5 h-5 text-yellow-400"/>
              <span>{movie.vote_average.toFixed(1)} / 10</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map(genre => (
              <span key={genre.id} className="px-3 py-1 bg-gray-800 text-sm rounded-full">{genre.name}</span>
            ))}
          </div>

          <p className="text-gray-300 leading-relaxed mb-8">{movie.overview}</p>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-600">You Might Also Like</h3>
            {isLoading ? <Spinner/> : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {similarMovies.map(m => (
                  <MovieCard key={m.id} movie={m} onSelectMovie={handleSelectMovie} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
