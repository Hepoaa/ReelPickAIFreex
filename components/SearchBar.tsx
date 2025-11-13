
import React, { useState } from 'react';
import { SearchIcon } from './Icon';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe a movie..."
        className="w-full pl-5 pr-14 py-4 text-lg text-white bg-gray-900 border-2 border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent transition-all duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300"
        disabled={isLoading}
      >
        <SearchIcon className="w-6 h-6" />
      </button>
    </form>
  );
};

export default SearchBar;
