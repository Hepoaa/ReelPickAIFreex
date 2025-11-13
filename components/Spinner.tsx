
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-16 h-16 border-4 border-t-orange-600 border-r-orange-600 border-gray-700 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
