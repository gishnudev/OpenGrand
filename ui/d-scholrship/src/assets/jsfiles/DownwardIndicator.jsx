import React from 'react';

const DownwardIndicator = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="animate-bounce flex flex-col items-center">
        <p className="text-sm text-gray-500">Scroll Down</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default DownwardIndicator;
