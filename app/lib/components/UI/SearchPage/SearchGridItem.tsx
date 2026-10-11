/**
 * SearchGridItem — a single search result: image, title link, metadata, and
 * favourite toggle.
 */
import FavouriteButton from '../FavouriteButton';
import ImageSkeleton from '../Skeleton/ImageSkeleton';
import type { MuseumItem } from '@/app/lib/types';
import {
  describeArtwork,
  getDisplayTitle,
  getImageUrl,
} from '@/app/lib/utils/museumItem';

const METADATA_FIELDS = [
  { key: 'artist', label: 'Artist', wide: false },
  { key: 'date', label: 'Date', wide: false },
  { key: 'culture', label: 'Culture', wide: false },
  { key: 'period', label: 'Period', wide: false },
  { key: 'medium', label: 'Medium', wide: true },
] as const;

function ExternalLink({
  href,
  className,
  children,
  ...rest
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string | null;
}) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...rest}>
      {children}
    </a>
  );
}

export default function SearchGridItem({ item }: { item: MuseumItem }) {
  const imageUrl = getImageUrl(item);
  const titleId = `artwork-${item.source}-${item.id}`;

  return (
    <li className="md:pr-6">
      <article className="p-4 relative" aria-labelledby={titleId}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-2/5 lg:w-1/3 flex-shrink-0">
            {/* The title link is the accessible link; this one only duplicates it for pointer users. */}
            <ExternalLink
              href={item.objectURL}
              tabIndex={-1}
              aria-hidden="true"
              className="block aspect-[4/3] overflow-hidden rounded-lg border border-gray-700 hover:border-red-600 transition-colors p-2">
              {imageUrl ? (
                <ImageSkeleton src={imageUrl} alt={describeArtwork(item)} />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    No image available
                  </span>
                </div>
              )}
            </ExternalLink>
          </div>

          <div className="flex-1 flex flex-col gap-4 pr-10">
            <ExternalLink
              href={item.objectURL}
              className="group inline-block self-start">
              <h3
                id={titleId}
                className="text-2xl italic font-medium font-crimson group-hover:text-red-600 transition-colors underline-animate">
                {getDisplayTitle(item)}
                {item.objectURL && (
                  <span className="sr-only"> (opens in new tab)</span>
                )}
              </h3>
            </ExternalLink>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 font-crimson">
              {METADATA_FIELDS.map(({ key, label, wide }) =>
                item[key] ? (
                  <div key={key} className={wide ? 'sm:col-span-2' : undefined}>
                    <dt className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                      {label}
                    </dt>
                    <dd
                      className={`text-white text-sm ${
                        key === 'artist' ? 'font-medium' : 'font-light'
                      }`}>
                      {item[key]}
                    </dd>
                  </div>
                ) : null
              )}
            </dl>
          </div>

          <div className="flex justify-center md:absolute md:top-1/2 md:right-4 md:-translate-y-1/2">
            <FavouriteButton item={item} />
          </div>
        </div>
      </article>
    </li>
  );
}
