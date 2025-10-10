import FavouriteButton from '../FavouriteButton';
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
      className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10"
      role="listitem">
      <article className="inline-block p-4">
        <div className="flex gap-10">
          <a
            href={objectURL || '#'}
            target={objectURL ? '_blank' : '_self'}
            rel={objectURL ? 'noopener noreferrer' : undefined}
            className="relative inline-block w-10/12 text-lg uppercase no-underline underline-animate"
            aria-label={`View details for ${title}${
              artist ? ` by ${artist}` : ''
            } ${
              objectURL ? '- opens in new tab' : '- no external link available'
            }`}>
            <div className="hover:text-red-600 font-crimsonPro">
              <div className="mb-1">
                <h3 className="text-2xl italic" id={`artwork-${id}`}>
                  {title || 'Untitled Artwork'}
                </h3>
              </div>

              {/* Controller for container */}
              <div className="col-span-2" aria-describedby={`artwork-${id}`}>
                {/* height here -- adjust as needed */}
                <div className="flex flex-row gap-8 h-76 sm:h-40 md:h-48 lg:h-auto font-crimsonPro line-clamp-2">
                  {artist && (
                    <div>
                      <span
                        className="text-white font-medium text-sm"
                        aria-label={`Artist: ${artist}`}>
                        {artist}
                      </span>
                    </div>
                  )}

                  {date && (
                    <div>
                      <span
                        className="text-white font-medium col-span-1 text-xs"
                        aria-label={`Date: ${date}`}>
                        {date}
                      </span>
                    </div>
                  )}

                  {culture && (
                    <div className="col-span-1">
                      <span
                        className="text-xs text-white font-medium"
                        aria-label={`Culture: ${culture}`}>
                        {culture}
                      </span>
                    </div>
                  )}

                  {period && (
                    <div>
                      <span
                        className="text-xs text-white font-medium"
                        aria-label={`Period: ${period}`}>
                        {period}
                      </span>
                    </div>
                  )}

                  {medium && (
                    <div className="col-span-2">
                      <span
                        className="text-xs text-white font-medium"
                        aria-label={`Medium: ${medium}`}>
                        {medium}
                      </span>
                    </div>
                  )}
                  {description && (
                    <div className="col-span-2">
                      <span
                        className="text-xs text-white font-medium"
                        aria-label={`Medium: ${description}`}>
                        {description}
                      </span>
                    </div>
                  )}
                </div>
                {/* IMAGE */}
                <div className="hidden lg:block aspect-video h-36 p-4 flex-shrink-0 border-1">
                  {primaryImageUrl ? (
                    <img
                      src={primaryImageUrl}
                      alt={title || 'Artwork'}
                      className="w-full h-full object-contain rounded shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </a>
          <div className="sr-only" aria-live="polite">
            Artwork: {title || 'Untitled'}. {artworkDescription}
          </div>

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
      </article>
    </div>
  );
}
