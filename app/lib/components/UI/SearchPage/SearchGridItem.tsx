import FavouriteButton from '../FavouriteButton';
import ImageSkeleton from '../Skeleton/ImageSkeleton';
import './underline-animate.css';
import type { SearchGridItemProps } from '@/app/lib/config/types';

export default function SearchGridItem({
  id,
  title,
  artist,
  date,
  medium,
  objectURL,
  period,
  description,
  culture,
  images,
  primaryImageUrl,
}: SearchGridItemProps) {
  const artworkDescription = [artist, date, culture, period, medium]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10 md:pr-6 "
      role="listitem">
      <article className="p-4 relative">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Image Section */}
          <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0">
            <a
              href={objectURL || '#'}
              target={objectURL ? '_blank' : '_self'}
              rel={objectURL ? 'noopener noreferrer' : undefined}
              className="block aspect-[4/3] overflow-hidden rounded-lg border border-gray-700 hover:border-red-600 transition-colors p-2"
              aria-label={`View image for ${title}${
                artist ? ` by ${artist}` : ''
              }`}>
              {primaryImageUrl ? (
                <ImageSkeleton src={primaryImageUrl} alt={title || 'Artwork'} />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    No image available
                  </span>
                </div>
              )}
            </a>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-4 pr-10">
            <a
              href={objectURL || '#'}
              target={objectURL ? '_blank' : '_self'}
              rel={objectURL ? 'noopener noreferrer' : undefined}
              className="group inline-block"
              aria-label={`View details for ${title}${
                artist ? ` by ${artist}` : ''
              } ${
                objectURL
                  ? '- opens in new tab'
                  : '- no external link available'
              }`}>
              <h3
                className="text-2xl md:text-2xl italic font-medium font-crimson group-hover:text-red-600 transition-colors underline-animate"
                id={`artwork-${id}`}>
                {title || 'Untitled Artwork'}
              </h3>
            </a>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 font-crimson"
              aria-describedby={`artwork-${id}`}>
              {artist && (
                <div>
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Artist
                  </span>
                  <span className="block text-white font-medium text-sm">
                    {artist}
                  </span>
                </div>
              )}

              {date && (
                <div>
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Date
                  </span>
                  <span className="block text-white font-light text-sm">
                    {date}
                  </span>
                </div>
              )}

              {culture && (
                <div>
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Culture
                  </span>
                  <span className="block text-white font-light text-sm">
                    {culture}
                  </span>
                </div>
              )}

              {period && (
                <div>
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Period
                  </span>
                  <span className="block text-white font-light text-sm">
                    {period}
                  </span>
                </div>
              )}

              {medium && (
                <div className="sm:col-span-2">
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Medium
                  </span>
                  <span className="block text-white font-light text-sm">
                    {medium}
                  </span>
                </div>
              )}

              {description && (
                <div className="sm:col-span-2">
                  <span className="block text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Description
                  </span>
                  <span className="block text-white font-light text-sm line-clamp-3">
                    {description}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center md:absolute md:top-1/2 md:right-4 md:transform md:-translate-y-1/2">
            <FavouriteButton
              key={id}
              id={id}
              title={title}
              artist={artist}
              date={date}
              culture={culture}
              medium={medium}
              objectURL={objectURL}
              primaryimageurl={primaryImageUrl}
              images={[images]}
            />
          </div>
        </div>

        <div className="sr-only" aria-live="polite">
          Artwork: {title || 'Untitled'}. {artworkDescription}
        </div>
      </article>
    </div>
  );
}
