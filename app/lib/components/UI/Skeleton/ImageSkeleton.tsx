/**
 * ImageSkeleton — lazy image that shows a pulsing placeholder while loading
 * and a fallback message if the image fails.
 */
'use client';
import { useEffect, useRef, useState } from 'react';

type LoadStatus = 'loading' | 'loaded' | 'error';

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
  const [status, setStatus] = useState<LoadStatus>('loading');
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can finish loading before hydration attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? 'loaded' : 'error');
  }, [src]);

  if (status === 'error') {
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <span className="text-gray-500 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-gray-700 rounded" />
            <div className="w-16 h-2 bg-gray-700 rounded" />
          </div>
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}
