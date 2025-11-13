
import React from 'react';
import { Movie } from '../types';
import { TMDB_IMAGE_URL } from '../constants';
import { FilmIcon } from './Icon';

interface MovieCardProps {
  movie: Movie;
  onSelectMovie: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelectMovie }) => {
  const imageUrl = movie.poster_path ? `${TMDB_IMAGE_URL}${movie.poster_path}` : null;

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onSelectMovie(movie)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => { if (e.key === 'Enter') onSelectMovie(movie); }}
    >
      <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-600/30">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`Poster for ${movie.title}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 p-2">
            <FilmIcon className="w-12 h-12 mb-2" />
            <span className="text-center text-sm">{movie.title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
