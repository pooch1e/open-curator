/**
 * CollectionItem — card for a favourited artwork; clicking the image opens
 * the lightbox.
 */
import FavouriteButton from '../FavouriteButton';
import type { MuseumItem } from '@/app/lib/types';
import {
  describeArtwork,
  getDisplayTitle,
  getImageUrl,
} from '@/app/lib/utils/museumItem';

interface CollectionItemProps {
  item: MuseumItem;
  onImageClick: () => void;
}

const DETAIL_FIELDS = [
  { key: 'date', label: 'Date', className: '' },
  { key: 'culture', label: 'Culture', className: '' },
  { key: 'medium', label: 'Medium', className: 'text-xs text-gray-500' },
] as const;

export default function CollectionItem({
  item,
  onImageClick,
}: CollectionItemProps) {
  const imageUrl = getImageUrl(item);

  return (
    <li className="group relative flex h-full flex-col gap-5 p-4 border border-gray-800 bg-gray-900/30 rounded-xl shadow-sm hover:shadow-md hover:border-red-600/40 transition-all duration-300">
      <button
        type="button"
        onClick={onImageClick}
        aria-label={`View ${describeArtwork(item)} full size`}
        className="relative w-full aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border border-gray-700/60 hover:border-red-600/50 transition-all duration-300">
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-lg" />

        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
            No image available
          </div>
        )}

        <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            aria-hidden="true">
            <path d="M15 3h6v6M10 14l9-9M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h7" />
          </svg>
        </div>
      </button>

      <div className="flex flex-col gap-3 flex-grow">
        <header className="flex flex-col gap-1">
          <h2 className="text-lg md:text-xl font-medium font-crimson italic tracking-tight group-hover:text-red-500 transition-colors">
            {getDisplayTitle(item)}
          </h2>
          {item.artist && (
            <p className="text-sm uppercase font-crimson font-medium text-gray-300 tracking-wide">
              {item.artist}
            </p>
          )}
        </header>

        <dl className="mt-1 flex flex-col gap-1 text-sm text-gray-400 font-crimson">
          {DETAIL_FIELDS.map(({ key, label, className }) =>
            item[key] ? (
              <div key={key}>
                <dt className="sr-only">{label}</dt>
                <dd className={className}>{item[key]}</dd>
              </div>
            ) : null
          )}
        </dl>
      </div>

      <footer className="flex flex-col gap-2 mt-auto border-t border-gray-800/60 pt-3">
        {item.department && (
          <p className="font-crimson font-light text-xs text-gray-500">
            {item.department}
          </p>
        )}

        {item.objectURL && (
          <a
            href={item.objectURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center font-crimson font-medium text-sm text-red-400 hover:text-red-500 underline underline-offset-2 transition-colors">
            View at Museum →<span className="sr-only"> (opens in new tab)</span>
          </a>
        )}
      </footer>

      <div className="flex justify-center">
        <FavouriteButton item={item} />
      </div>
    </li>
  );
}
