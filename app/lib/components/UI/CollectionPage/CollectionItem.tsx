/**
 * CollectionItem — gallery card for a saved artwork: image that opens the
 * lightbox, a remove toggle, and a short caption.
 */
import FavouriteButton from '../FavouriteButton';
import ImageSkeleton from '../Skeleton/ImageSkeleton';
import type { MuseumItem } from '@/app/lib/types';
import {
  SOURCE_SHORT_LABELS,
  describeArtwork,
  getDisplayTitle,
  getImageUrl,
} from '@/app/lib/utils/museumItem';

interface CollectionItemProps {
  item: MuseumItem;
  onOpen: () => void;
}

export default function CollectionItem({ item, onOpen }: CollectionItemProps) {
  const imageUrl = getImageUrl(item);
  const caption = [item.date, SOURCE_SHORT_LABELS[item.source]]
    .filter(Boolean)
    .join(' · ');

  return (
    <li>
      <article className="group flex flex-col gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={onOpen}
            aria-label={`View ${describeArtwork(item)} full size`}
            className="block w-full aspect-[4/5] overflow-hidden rounded-md bg-gray-900 cursor-zoom-in">
            {imageUrl ? (
              <ImageSkeleton
                src={imageUrl}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <span className="flex h-full items-center justify-center text-sm text-gray-400">
                No image available
              </span>
            )}
          </button>
          <FavouriteButton
            item={item}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black"
          />
        </div>

        <div className="flex flex-col gap-1 font-crimson">
          <h2 className="text-xl italic font-medium leading-snug">
            {getDisplayTitle(item)}
          </h2>
          {item.artist && (
            <p className="text-sm uppercase tracking-wide text-gray-300">
              {item.artist}
            </p>
          )}
          {caption && <p className="text-sm text-gray-400">{caption}</p>}
        </div>
      </article>
    </li>
  );
}
