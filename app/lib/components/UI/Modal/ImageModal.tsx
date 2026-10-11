/**
 * ImageModal — full-screen lightbox for browsing collection artworks. Renders
 * in a portal, marks the rest of the app inert, traps focus, locks scrolling,
 * and supports arrow-key navigation.
 */
'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { MuseumItem } from '@/app/lib/types';
import { APP_SHELL_ID } from '@/app/lib/config/appShell';
import {
  SOURCE_LABELS,
  describeArtwork,
  getArtworkDetails,
  getDisplayTitle,
  getImageUrl,
} from '@/app/lib/utils/museumItem';

interface ImageModalProps {
  items: MuseumItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MODAL_DETAIL_KEYS = [
  'date',
  'culture',
  'period',
  'medium',
  'dimensions',
  'department',
] as const;

const NAV_BUTTON_CLASS =
  'absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/60 p-2 text-white hover:text-red-500';

function ModalImage({ item }: { item: MuseumItem }) {
  const [hasFailed, setHasFailed] = useState(false);
  const imageUrl = getImageUrl(item);

  if (!imageUrl || hasFailed) {
    return (
      <div className="flex h-96 w-full max-w-96 items-center justify-center rounded-lg bg-gray-900">
        <span className="font-crimson text-gray-300">
          {imageUrl ? 'Image unavailable' : 'No image available'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={describeArtwork(item)}
      onError={() => setHasFailed(true)}
      className="max-h-[80vh] max-w-full rounded-lg object-contain"
    />
  );
}

export default function ImageModal({
  items,
  currentIndex,
  onNavigate,
  onClose,
}: ImageModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const currentItem = items[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  useEffect(() => {
    const appShell = document.getElementById(APP_SHELL_ID);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    if (appShell) appShell.inert = true;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      if (appShell) appShell.inert = false;
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, []);

  useEffect(() => {
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrevious) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(currentIndex + 1);
      if (e.key === 'Tab') trapFocus(e);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrevious, hasNext, onClose, onNavigate]);

  if (!currentItem) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title">
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:text-red-500"
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
            onNavigate(currentIndex - 1);
          }}
          className={`${NAV_BUTTON_CLASS} left-4`}
          aria-label="Previous artwork">
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
            onNavigate(currentIndex + 1);
          }}
          className={`${NAV_BUTTON_CLASS} right-4`}
          aria-label="Next artwork">
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
        className="mx-auto flex max-h-full max-w-7xl flex-col gap-6 overflow-y-auto p-4 lg:flex-row"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-1 items-center justify-center">
          <ModalImage key={currentIndex} item={currentItem} />
        </div>

        <div className="max-h-[80vh] overflow-y-auto rounded-lg bg-gray-900 p-6 font-crimson lg:w-80">
          <h2 id="modal-title" className="mb-2 text-2xl font-medium text-white">
            {getDisplayTitle(currentItem)}
          </h2>

          {currentItem.artist && (
            <p className="mb-4 text-lg text-white">by {currentItem.artist}</p>
          )}

          <dl className="space-y-3">
            {getArtworkDetails(currentItem, MODAL_DETAIL_KEYS).map(
              ({ key, label, value }) => (
                <div key={key}>
                  <dt className="text-sm font-light uppercase tracking-wide text-gray-300">
                    {label}
                  </dt>
                  <dd className="font-light text-white">{value}</dd>
                </div>
              )
            )}
          </dl>

          {currentItem.objectURL && (
            <div className="mt-6 border-t border-gray-700 pt-4">
              <a
                href={currentItem.objectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 font-medium text-white transition-colors hover:bg-red-800">
                View at {SOURCE_LABELS[currentItem.source]}
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

          <p className="mt-6 border-t border-gray-700 pt-4 text-center text-sm font-light text-gray-300">
            {currentIndex + 1} of {items.length}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
