'use client'

import {  useEffect } from 'react'
import type { CollectionItem } from '@/app/lib/config/types'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  items: CollectionItem[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function ImageModal({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate
}: ImageModalProps) {
  const currentItem = items[currentIndex]

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          if (currentIndex > 0) onNavigate(currentIndex - 1)
          break
        case 'ArrowRight':
          if (currentIndex < items.length - 1) onNavigate(currentIndex + 1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex, items.length, onClose, onNavigate])

  //on modal mount, remove scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !currentItem) return null

  const imageUrl = currentItem.primaryimageurl || currentItem.images?.[0]?.baseimageurl

  return (
    <div 
      className="fixed inset-0 font-serif bg-black bg-opacity-95 z-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-600 z-10 p-2"
        aria-label="Close gallery"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Nav buttons */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex - 1)
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-red-600 p-2 z-10"
          aria-label="Previous image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>
      )}

      {currentIndex < items.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(currentIndex + 1)
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-6ed-400 p-2 z-10"
          aria-label="Next image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      )}

      {/* Main content */}
      <div 
        className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="flex-1 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${currentItem.title || 'Untitled'} ${currentItem.artist ? `by ${currentItem.artist}` : ''}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          ) : (
            <div className="w-96 h-96 bg-black rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-crimson">No image available</span>
            </div>
          )}
        </div>

        {/* Artwork details sidebar */}
        <div className="lg:w-80 bg-gray-900 rounded-lg p-6 overflow-y-auto max-h-[80vh]">
          <h2 id="modal-title" className="text-2xl font-crimson font-medium text-white mb-2">
            {currentItem.title || 'Untitled'}
          </h2>
          
          {currentItem.artist && (
            <p className="text-lg font-crimson font-normal text-white mb-4">
              by {currentItem.artist}
            </p>
          )}

          <div className="space-y-3">
            {currentItem.date && (
              <div>
                <dt className="text-sm font-crimson font-light text-white uppercase tracking-wide">Date</dt>
                <dd className="text-white font-crimson font-light">{currentItem.date}</dd>
              </div>
            )}
            
            {currentItem.culture && (
              <div>
                <dt className="text-sm font-crimson font-light text-white uppercase tracking-wide">Culture</dt>
                <dd className="text-white font-crimson font-light">{currentItem.culture}</dd>
              </div>
            )}
            
            {currentItem.medium && (
              <div>
                <dt className="text-sm font-crimson font-light text-white uppercase tracking-wide">Medium</dt>
                <dd className="text-white font-crimson font-light">{currentItem.medium}</dd>
              </div>
            )}
            
            {currentItem.department && (
              <div>
                <dt className="text-sm font-crimson font-light text-white uppercase tracking-wide">Department</dt>
                <dd className="text-white font-crimson font-light">{currentItem.department}</dd>
              </div>
            )}
          </div>

          {currentItem.objectURL && (
            <div className="mt-6 pt-4 border-t border-gray-700">
              <a
                href={currentItem.objectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-crimson font-medium transition-colors"
              >
                View at Museum
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <polyline points="15,3 21,3 21,9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          )}

          {/* Gallery counter */}
          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <span className="text-gray-400 font-crimson font-light text-sm">
              {currentIndex + 1} of {items.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}