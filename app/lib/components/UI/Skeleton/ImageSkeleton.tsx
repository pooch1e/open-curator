'use client';

import { useState } from 'react';

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageSkeleton({
  src,
  alt,
  className = 'w-full h-full object-scale-down hover:scale-105 transition-transform duration-300',
}: ImageSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
            <div className="w-16 h-2 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      )}

      {hasError && (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-300`}
        loading="lazy"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
