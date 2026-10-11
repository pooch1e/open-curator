/**
 * ImageModal — full-screen lightbox for browsing collection artworks, with
 * keyboard navigation, focus trapping, and scroll locking.
 */
'use client';
import { useEffect, useRef } from 'react';
import type { MuseumItem } from '@/app/lib/types';
import {
  describeArtwork,
  getDisplayTitle,
  getImageUrl,
} from '@/app/lib/utils/museumItem';

interface ImageModalProps {
  onClose: () => void;
  items: MuseumItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DETAIL_FIELDS = [
  { key: 'date', label: 'Date' },
  { key: 'culture', label: 'Culture' },
  { key: 'medium', label: 'Medium' },
  { key: 'department', label: 'Department' },
] as const;

export default function ImageModal({
  onClose,
  items,
  currentIndex,
  onNavigate,
}: ImageModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const index = Math.min(currentIndex, items.length - 1);
  const currentItem = items[index];
  const hasPrevious = index > 0;
  const hasNext = index < items.length - 1;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious) onNavigate(index - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(index + 1);
      if (e.key === 'Tab') trapFocus(e);
    };

    const trapFocus = (e: KeyboardEvent) => {
      const focusable =
        dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [index, hasPrevious, hasNext, onClose, onNavigate]);

  if (!currentItem) return null;

  const imageUrl = getImageUrl(currentItem);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-600 z-10 p-2"
        aria-label="Close gallery">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {hasPrevious && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index - 1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-600 p-2 z-10"
          aria-label="Previous image">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>
      )}

      {hasNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(index + 1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-600 p-2 z-10"
          aria-label="Next image">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true">
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>
      )}

      <div
        className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 gap-6"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex-1 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={describeArtwork(currentItem)}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          ) : (
            <div className="w-96 h-96 bg-black rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-crimson">
                No image available
              </span>
            </div>
          )}
        </div>

        <div className="lg:w-80 bg-gray-900 rounded-lg p-6 overflow-y-auto max-h-[80vh] font-crimson">
          <h2 id="modal-title" className="text-2xl font-medium text-white mb-2">
            {getDisplayTitle(currentItem)}
          </h2>

          {currentItem.artist && (
            <p className="text-lg font-normal text-white mb-4">
              by {currentItem.artist}
            </p>
          )}

          <dl className="space-y-3">
            {DETAIL_FIELDS.map(({ key, label }) =>
              currentItem[key] ? (
                <div key={key}>
                  <dt className="text-sm font-light text-white uppercase tracking-wide">
                    {label}
                  </dt>
                  <dd className="text-white font-light">{currentItem[key]}</dd>
                </div>
              ) : null
            )}
          </dl>

          {currentItem.objectURL && (
            <div className="mt-6 pt-4 border-t border-gray-700">
              <a
                href={currentItem.objectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                View at Museum
                <span className="sr-only">(opens in new tab)</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <span className="text-gray-400 font-light text-sm">
              {index + 1} of {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
