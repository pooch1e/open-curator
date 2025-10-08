import FavouriteButton from '../FavouriteButton';
import './underline-animate.css';

interface Image {
  alttext: string | null;
  baseimageurl: string;
  copyright: string | null;
  date: string | null;
  description: string | null;
  displayorder: number;
  format: string | null;
  height: number | null;
  idsid: number | null;
  iiifbaseuri: string | null;
  imageid: number;
  publiccaption: string | null;
  renditionnumber: string | null;
  technique: string | null;
  width: number | null;
}
interface SearchGridItemProps {
  id: number;
  title: string;
  artist: string;
  date: string;
  medium: string;
  objectURL: string;
  period: string;
  description: string;
  culture: string;
  images: Image;
  primaryImageUrl: string;
}
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
  const artworkDescription = [artist, date, culture, period, medium].filter(Boolean).join(', ');
  
  return (
    <div className="col-span-4 col-start-1 flex flex-col gap-6 sm:col-span-12 md:gap-10" role="listitem">
      <article className="inline-block p-4">
        <a
          href={objectURL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block w-10/12 text-lg uppercase no-underline underline-animate"
          aria-label={`View details for ${title}${artist ? ` by ${artist}` : ''} - opens in new tab`}>
          <div className="hover:text-red-400">
            <div className="mb-1">
              <h3 className="text-2xl italic" id={`artwork-${id}`}>{title || 'Untitled Artwork'}</h3>
            </div>
            <div className="grid grid-cols-4 gap-8" aria-describedby={`artwork-${id}`}>
              <div className="flex flex-row gap-8">
                {artist && (
                  <div>
                    <span className="text-white font-medium text-sm" aria-label={`Artist: ${artist}`}>
                      {artist}
                    </span>
                  </div>
                )}

                {date && (
                  <div>
                    <span className="text-white font-medium grid-cols-2 text-xs" aria-label={`Date: ${date}`}>
                      {date}
                    </span>
                  </div>
                )}

                {culture && (
                  <div>
                    <span className="text-xs text-white font-medium" aria-label={`Culture: ${culture}`}>
                      {culture}
                    </span>
                  </div>
                )}

                {period && (
                  <div>
                    <span className="text-xs text-white font-medium" aria-label={`Period: ${period}`}>
                      {period}
                    </span>
                  </div>
                )}

                {medium && (
                  <div className="col-span-2">
                    <span className="text-xs text-white font-medium" aria-label={`Medium: ${medium}`}>
                      {medium}
                    </span>
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
      </article>
    </div>
  );
}
