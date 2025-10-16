'use client'

import { useState } from 'react'
import ClearAllFavouritesButton from '../ClearAllFavouritesButton'
import CollectionItem from './CollectionItem'
import ImageModal from '../Modal/ImageModal'
import type { CollectionItem as CollectionItemType } from '@/app/lib/config/types'

interface collectionContainerProps {
  favourites: CollectionItemType[]
}

export default function CollectionContainer({
  favourites,
}: collectionContainerProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const navigateModal = (index: number) => {
    setCurrentImageIndex(index)
  }
  return (
    <section className="py-8 px-4 md:py-12" aria-labelledby="collection-heading" role="region">
      <div className='px-6 py-2'>
        <ClearAllFavouritesButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 id="collection-heading" className="text-2xl md:text-3xl font-bold text-white mb-6 text-center p-4">
          My Collection 
          <span className='p-4' aria-label={`${favourites.length} items in collection`}>({favourites.length})</span>
        </h1>

        {favourites.length === 0 ? (
          <p className="text-white" aria-live="polite">Your collection is empty. Add artworks to see them here.</p>
        ) : (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            role="list"
            aria-label={`Collection of ${favourites.length} artworks`}>
            {favourites.map((item, index) => (
              <CollectionItem 
                key={item.id} 
                collectionData={item} 
                onImageClick={() => openModal(index)}
              />
            ))}
          </div>
        )}
      </div>

      <ImageModal
        isOpen={modalOpen}
        onClose={closeModal}
        items={favourites}
        currentIndex={currentImageIndex}
        onNavigate={navigateModal}
      />
    </section>
  )
}
