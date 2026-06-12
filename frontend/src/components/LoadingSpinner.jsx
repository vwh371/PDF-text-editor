import React from 'react';
import { Loader } from 'lucide-react';

/**
 * LoadingSpinner Component
 * Full-screen overlay with animated spinner for async operations
 * Shown during file upload, PDF processing, and save operations
 */
const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal card */}
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl">
        {/* Animated spinner container */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
          {/* Inner pulsing icon */}
          <Loader className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-green-600 animate-pulse" />
        </div>
        {/* Loading message */}
        <p className="text-gray-700 font-medium">Processing your PDF...</p>
        <p className="text-sm text-gray-500">This may take a few seconds</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;