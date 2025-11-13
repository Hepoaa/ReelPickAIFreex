
import React from 'react';
import { FilmIcon } from './Icon';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-black/50 backdrop-blur-sm sticky top-0 z-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-wider flex items-center justify-center gap-3">
          <FilmIcon className="w-10 h-10 text-orange-600" />
          CineFind<span className="text-orange-600">Ai</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
