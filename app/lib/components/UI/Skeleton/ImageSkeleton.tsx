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

const DEFAULT_IMAGE_CLASS =
  'w-full h-full object-scale-down hover:scale-105 transition-transform duration-300';

function ImageWithStatus({
  src,
  alt,
  className = DEFAULT_IMAGE_CLASS,
}: ImageSkeletonProps) {
  const [status, setStatus] = useState<LoadStatus>('loading');
  const imgRef = useRef<HTMLImageElement>(null);

  // Cached images can finish loading before hydration attaches onLoad. Only
  // trust a decoded image here: lazy images that haven't started can also
  // report `complete`, so an error is left for onError to report.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setStatus('loaded');
  }, []);

  if (status === 'error') {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center p-4 text-center">
        <span className="text-gray-400 text-sm">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {status === 'loading' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-800 animate-pulse"
        />
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

export default function ImageSkeleton(props: ImageSkeletonProps) {
  return <ImageWithStatus key={props.src} {...props} />;
}
